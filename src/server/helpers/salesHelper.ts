import { SalesDetails } from "../models/SalesDetails";
import { Users } from "../models/Users";
import { Op } from "sequelize/types";
import { sequelize } from "../config/sequelize-config";
import { Sales } from "../models/Sales";

export async function getDiscountReportByPaymentMethodSpecific(start:string, end:string, field:string): Promise<Sales[]>{
    let objects =  await Sales.findAll({
        attributes: [
            [sequelize.literal(`(select sum(tax)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'total_amount'],
            [sequelize.literal(`(select sum(discount)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'discount'],
            "payment_method",
            field
        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }

        },
        group: ['payment_method', field]
    });
    return objects
}

export async function getDiscountTaxReportByUser(start: string, end: string): Promise<Sales[]> {
    let objects = await Sales.findAll({
        attributes: [
            [sequelize.literal(`(select sum(tax)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'total_amount'],
            [sequelize.literal(`(select sum(discount)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'discount'],

        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }

        },
        group: ['created_by'],
        order: [['created_by', 'asc']],
        include: [
            {
                model: Users,
                attributes: ['display_name']
            },
            {
                model: SalesDetails,
                attributes: []
            }
        ]
    });
    return objects
}

export async function getSalesReportByUser(start:string, end:string): Promise<Sales[]>{
    let objects = Sales.findAll({
        attributes: [
            "payment_method",
            "display_name",
                [sequelize.literal(`(select sum(price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total'],
                [sequelize.literal(`(select sum(tax)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'total_amount'],
                [sequelize.literal(`(select sum(discount)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'discount'],
                [sequelize.literal(`(select sum(cost_price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total_cost'],

            ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }

        },
        group: ['created_by', 'payment_method'],
        order: [['created_by', 'asc']],
        include: [
            {
                model: Users,
                attributes: ['display_name']
            },
            {
                model: SalesDetails,
                attributes: []
            }
        ]
    });
    return objects
}

export async function getSalesReportByShift(start: string, end: string): Promise<Sales[]> {
    let objects = Sales.findAll({
        attributes: [
            "payment_method",
            "shift",
            [sequelize.literal(`(select sum(price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total'],
            [sequelize.literal(`(select sum(tax)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'total_amount'],
            [sequelize.literal(`(select sum(discount)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'discount'],
            [sequelize.literal(`(select sum(cost_price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total_cost'],

        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }

        },
        group: ['shift', 'payment_method'],
        order: [['shift', 'asc']],
        include: [

            {
                model: SalesDetails,
                attributes: []
            }
        ]
    });
    return objects
}

export async function getUserSales(start: string, end: string): Promise<Sales[]> {
    let objects = Sales.findAll({
        attributes: [
            "created_by",
            "display_name",
            [sequelize.fn('COUNT', sequelize.col('code')), 'num_of_items'],

            [sequelize.literal(`(select sum(price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total'],
           
        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }

        },
        group: ['created_by'],
        include: [
            {
                model: Users,
                attributes: ['display_name']
            },
            {
                model: SalesDetails,
                attributes: []
            }
        ]
    });
    return objects
}


export async function getSalesByPaymentMethod(start: string, end: string, payment_method?: string): Promise<Sales[]> {
    let objects = Sales.findAll({
        attributes: [
            "payment_method",
            [sequelize.literal(`(select sum(price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total'],
        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }
        },
        group: ['payment_method'],
        include: [
            
            {
                model: SalesDetails,
                attributes: [],
                where: {
                    ...(payment_method && {payment_method: payment_method})
                }
            }
        ]
    });
    return objects
}

export async function getDailySalesWithPaymentMethods(start: string, end: string): Promise<Sales[]> {
    let objects = Sales.findAll({
        attributes: [
            "payment_method",
            "date",
            [sequelize.literal(`(select sum(price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total'],
            [sequelize.literal(`(select sum(tax)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'total_amount'],
            [sequelize.literal(`(select sum(discount)  from ${Sales.tableName} where ${Sales.tableName}.code = ${Sales.tableName}.code))`), 'discount'],
            [sequelize.literal(`(select sum(cost_price * quantity)  from ${SalesDetails.tableName} where ${SalesDetails.tableName}.code = ${Sales.tableName}.code)`), 'total_cost'],

        ],
        where: {
            date: { [Op.between]: [new Date(start), new Date(end)] }
        },
        group: ['date','payment_method'],
        include: [

            {
                model: SalesDetails,
                attributes: [],
                
            }
        ]
    });
    return objects
}
