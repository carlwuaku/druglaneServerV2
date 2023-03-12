import { Op, WhereOptions } from "sequelize";

//parse params sent through an array object [{field:name, operator:includes, param: some product name}]
/**
 * get the where options for a search query
 * @param data an array of search query [{field:name, operator:includes, param: some product name}]
 * @returns sequelize WhereOptions
 */
export function parseSearchQuery(data: SearchQuery[]): WhereOptions<any> {
    //for each item, use the operator to determine the sequelize operator
    let where: WhereOptions<any> = {};
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        where[element.field] = getOperator(element.operator, element.param)
    }
    return where;
}

export function getOperator(operator: string, param: string): any {
    //the param may be separated by commas.
    //TODO: CONSIDER changing that to an array of strings instead 

    //store the like operator queries
    let like_queries: any[] = getOperatorParamArray(operator, param);

    switch (operator) {
        case 'includes':

            return {
                [Op.or]: like_queries //the result of a loop goes here}
            }
        default:
            return {
                [Op.or]: like_queries //the result of a loop goes here}
            }
    }
}

export function getOperatorParamArray(operator: string, param: string | Array<any>): Object[] {
    let params = typeof(param) === "string" ? param.split(",").map(p => p.trim()) : [param]
    //store the like operator queries
    let like_queries: any[] = []
    params.forEach(p => {
        switch (operator) {
            case 'includes':
                like_queries.push({ [Op.like]: `%${p}%` })
                break;
            case 'starts_with':
                like_queries.push({ [Op.like]: `${p}%` })
                break;
            case 'ends_with':
                like_queries.push({ [Op.like]: `%${p}` })
                break;
            case 'equals':
                like_queries.push({ [Op.eq]: `${p}` })
                break;
            case 'between':
                like_queries.push({ [Op.between]: p })//an array is expected for the value
                break;
            case 'less_than':
                like_queries.push({ [Op.lt]: p })//a number is expected for the value
                break;
            case 'greater_than':
                like_queries.push({ [Op.gt]: p })//a number is expected for the value
                break;
            

            default:
                like_queries.push({ [Op.like]: `${p}` })
        }
    });
    return like_queries
}

interface SearchQuery {
    field: string;
    operator: string;
    param: string;
}