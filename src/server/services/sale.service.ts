import { parseSearchQuery } from "../helpers/searchHelper";
import { Includeable, Op, Transaction, WhereOptions } from "sequelize/types";
import { Sales } from "../models/Sales";
import { logger } from "../config/logger";
import { SalesDetails } from "../models/SalesDetails";
import { sequelize } from "../config/sequelize-config";
import { Products } from "../models/Products";
import { refreshCurrentStock, updateStockValue } from "../helpers/productsHelper";
import { Activities } from "../models/Activities";
import { Customers } from "../models/Customers";
import { Users } from "../models/Users";

const module_name = "sales";
const attributes: Includeable[] = [{
    model: Customers,
    attributes: ['name', 'id']
},
{
    model: Users,
    attributes: ['display_name']
},
{
    model: SalesDetails,
    attributes: [
        [sequelize.literal('sum(quantity * price)'), 'total_amount'],
        [sequelize.literal('count(id)'), 'num_items']

    ],
}
]

//TODO: make sure deleted details do not affect stock values
/**
 * get a list of Sales matching the params provided. the params can be empty or a json string
 * @param _data an object where param is a json string
 * @returns list of matching Sales
 */
export async function _getList(_data: { [key: string]: any }): Promise<Sales[]> {
    try {

        let limit = _data.limit ? parseInt(_data.limit) : 100;
        let offset = _data.offset ? parseInt(_data.offset) : 0;

        //if user specifies a search query
        let where: WhereOptions = {};
        if (_data.param) {
            let searchQuery = JSON.parse(_data.param)
            where = parseSearchQuery(searchQuery)
        }
        let objects = await Sales.findAll({

            limit,
            offset,
            order: [["name", "asc"]],
            where,
            include: attributes
        });



        return objects;
    } catch (error) {

        logger.error({ message: error })
        throw new Error(error);
    }

};

/**
 * save or update a purchase. if a code is provided, an update is performed, else an insert. 
 * @param _data details of the purchase such invoice number, vendor and date, and the details of the items
 * @returns the code of the saved purchase
 */
export async function save(_data: { [key: string]: any }): Promise<string> {
    try {
        //the data should come with the purchase data and
        //the details data
        let items: any[] = JSON.parse(_data.items);
        //if no code was given, generate one and create. else
        //delete that code and re-insert
        let code = _data.code;
        let activity = "";
        let old_details: SalesDetails[] = []
        const result = await sequelize.transaction(async (t: Transaction) => {
            
            if (code) {
                //editing must not affect the details
                let object = await Sales.findOne({
                    where: { code: code }
                })
                activity = `updated sales item with code ${code}.`

                await object.update(_data, {
                    transaction: t
                });
                
            }
            else {
                //generate code
                let last_id: number = await Sales.max('id');
                code = `${(last_id + 1).toString().padStart(5, '0')}`;
                activity = `created purchase item with code ${code}`

            
                _data.code = code;
                _data.created_by = _data.user_id;
                await Sales.create(_data, {
                    transaction: t
                });
                items.map(item => {
                    item.code = code;
                    item.date = _data.date;
                    item.created_by = _data.user_id
                })

                await SalesDetails.bulkCreate(items,
                    {
                        transaction: t
                    });
                //update the product details
                items.concat(old_details).forEach(async (item) => {
                    await Products.update(
                        {
                            price: item.selling_price,
                            cost_price: item.price,
                            unit: item.unit,
                            expiry: item.expiry,
                            markup: item.markup,
                            description: item.description
                        },
                        {
                            where: { id: item.product },
                            transaction: t
                        }
                    )
                });

            }

            t.afterCommit(async () => {
                //update stock value
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    await refreshCurrentStock(item.product);
                }
                updateStockValue();
                Activities.create({
                    activity: activity,
                    user_id: `${_data.user_id}`,
                    module: module_name
                })
            });
            return code;
        })

        return result

    } catch (error) {
        logger.error({ message: error })
        throw new Error(error);
    }
}

/**
 * get the items in a purchase
 * @param _data must contain some search params
 * @returns a list of purchase details
 */
export async function getDetails(_data: { [key: string]: any }): Promise<SalesDetails[]> {
    try {

        let where: WhereOptions = {};
        //if customer or product set,..
        if (_data.customer) {
            where['customer'] = sequelize.literal(`(code in (select code fom ${sequelize.col(Sales.tableName)} where customer = '${_data.customer}'))`)
        }
        if (_data.param) {
            let searchQuery = JSON.parse(_data.param)
            where = parseSearchQuery(searchQuery)
        }
        let objects = await SalesDetails.findAll({
            attributes: {
                include: [
                    [sequelize.literal('price * quantity'), 'total']
                ]
            },
            where: where,
            include: [{
                model: Products,
                attributes: [['name', 'product_name'], ['id', 'product_id']]
            }
            ]
        });
        return objects
    } catch (error) {
        logger.error({ message: error })
        throw new Error(error);
    }
}


/**
 * delete purchases using the ids
 * @param _data must contain the ids to be deleted as an array stringified
 */
export async function deleteSales(_data: { [key: string]: any }): Promise<boolean> {
    try {
        let codes: any[] = JSON.parse(_data.codes);
        //get all the items in the codes
        let items = await SalesDetails.findAll({
            where: {
                code: { [Op.in]: codes }
            }
        })
        const result = await sequelize.transaction(async (t: Transaction) => {

            await Sales.destroy({
                where: {
                    code: { [Op.in]: codes }
                },
                transaction: t
            });

            await SalesDetails.destroy({
                where: {
                    code: { [Op.in]: codes }
                },
                transaction: t
            });
            t.afterCommit(async () => {
                //update stock value
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    await refreshCurrentStock(item.product);
                }
                updateStockValue();
                Activities.create({
                    activity: `temporarily deleted sales invoices with codes ${_data.codes}`,
                    user_id: `${_data.user_id}`,
                    module: module_name
                })
            });
            return true;
        });
        return result;
    } catch (error) {
        logger.error({ message: error })
        throw new Error(error);
    }
}


/**
 * get a single purchase object using the id or code    
 * @param _data must contain the id or code of the purchase
 * @returns a purchase item
 */
export async function find(_data: { [key: string]: any }): Promise<Sales> {
    try {
        let object = Sales.findOne({
            where: {
                [Op.or]: [
                    { id: _data.id },
                    { code: _data.id }
                ]
            },
            include: attributes
        });
        return object;
    } catch (error) {
        logger.error({ message: error })
        throw new Error(error);
    }
}