import { SalesDetails } from "../models/SalesDetails";
import { Users } from "../models/Users";
import { Op } from "sequelize";
import { sequelize } from "../config/sequelize-config";
import { Sales } from "../models/Sales";
import { DailyRecords } from "../models/DailyRecords";
import { IncomingPayments } from "../models/IncomingPayments";

export async function getDiscountReportByPaymentMethodSpecific(start: string, end: string, field: string): Promise<Sales[]> {
    let objects = await Sales.findAll({
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

export async function getSalesReportByUser(start: string, end: string): Promise<Sales[]> {
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
                    ...(payment_method && { payment_method: payment_method })
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
        group: ['date', 'payment_method'],
        include: [

            {
                model: SalesDetails,
                attributes: [],

            }
        ]
    });
    return objects
}

export async function getTotalSummary(date: string): Promise<DailyRecords> {
    try {
        let object = await DailyRecords.findOne({
            attributes: [
                [sequelize.fn("SUM", sequelize.col('cash')), 'cash'],
                [sequelize.fn("SUM", sequelize.col('momo')), 'momo'],
                [sequelize.fn("SUM", sequelize.col('pos')), 'pos'],
                [sequelize.fn("SUM", sequelize.col('cheque')), 'cheque'],
                [sequelize.fn("SUM", sequelize.col('other')), 'other'],
                [sequelize.fn("SUM", sequelize.col('credit')), 'credit'],
                [sequelize.fn("SUM", sequelize.col('insurance')), 'insurance'],


            ],
            where: {
                date: date,
            }
        });
        if (!object) {
            throw new Error("getTotalSummary object not found");
        }
        return object
    } catch (error: any) {
        throw new Error(error)
    }

}

export async function getTotalIncomingPaid(payer?: string, start?: string, end?: string): Promise<number> {
    try {

        let object = await IncomingPayments.findOne({
            attributes: [
                [sequelize.fn("SUM", sequelize.col('amount')), 'total']
            ],
            where: {
                type: 'Credit Sale Payment',
                ...(start && { date: { [Op.gte]: new Date(start) } }),
                ...(end && { date: { [Op.lte]: new Date(end) } }),
                ...(payer && { payer: payer })
            }
        });

        if (!object) {
            throw new Error("getTotalIncomingPaid object not found");
        }
        return object.total || 0
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getTotalSales(start: string, end: string): Promise<number> {
    try {
        let object = await SalesDetails.findOne({
            attributes: [
                [sequelize.literal(`sum(price * quantity)`), 'total_amount'],
                [sequelize.fn("SUM", sequelize.col('amount')), 'total']
            ],
            where: {
                date: { [Op.between]: [new Date(start), new Date(end)] },

            }
        });
        if (!object) {
            throw new Error("getTotalSales object not found");
        }
        return object.total || 0
    } catch (error: any) {
        throw new Error(error)
    }
    
}

export function flattenNestedProperties(object:any) {
    if (!object) return;

    const flattenedObject = {
        ...object,
        customer_id: object['Customer.customer_id'],
        customer_name: object['Customer.customer_name'],
        display_name: object['User.display_name'],
        total: object['sales_details.total'],
        num_of_items: object['sales_details.num_of_items'],
    };

    delete flattenedObject['Customer.customer_id'];
    delete flattenedObject['Customer.customer_name'];
    delete flattenedObject['User.display_name'];
    delete flattenedObject['sales_details.total_amount'];
    delete flattenedObject['sales_details.num_of_items'];

    Object.assign(object, flattenedObject);
}