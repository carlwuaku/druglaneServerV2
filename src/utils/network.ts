import { logger } from "@/app/config/logger";
import axios, { AxiosResponse } from 'axios'
/**
 * make a get call to a url with some optional params
 * @param url the url to call
 * @param params a map of key-value pairs to append as parameters
 * @returns the clientrequest object
 */
// export function getData(url:string, params?:Map<string, any>):ClientRequest {
//     if(!net.isOnline) throw new Error("Offline");

//     try {
//         if (params) {
//             let urlParams: string[] = [];
//             params.forEach((value, key) => {
//                 urlParams.push(`${key}=${value}`)
//             });
//             url += "?" + urlParams.join("&")
//         }
//         const request = net.request(url);
//         request.on("error", (error) => {
//             console.log(error)
//             logger.error(error)
//             throw new Error("Network Error");

//         })

//         return request;
//     } catch (error) {
//         console.log(error)
//         logger.error({ message: error });
//         throw new Error("Network Error");

//     }

// }

export async function getData<T>(url: string, params?: Map<string, any>): Promise<AxiosResponse<T>> {
    try {
        if (params) {
            let urlParams: string[] = [];
            params.forEach((value, key) => {
                urlParams.push(`${key}=${value}`)
            });
            if (url.includes("?")) {
                url += "&" + urlParams.join("&")
            }
            else {
                url += "?" + urlParams.join("&")
            }

        }
        logger.info({ message: `call made to ${url} ` })
        const response = await axios.get(url);
        logger.info({ message: `response received: ${JSON.stringify(response.data)}` })
        return response
    } catch (error) {
        logger.info({ message: `error in receiving : error` })
        throw new Error(`error in calling url: ${url}`);
    }
}

export async function postData<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    try {
        logger.info({ message: `call made to ${url}. data: ${JSON.stringify(data)}` });
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        logger.info({ message: `response received: ${JSON.stringify(response.data)}` })

        return response
    } catch (error) {
        logger.info({ message: `error in receiving : error` })
        throw new Error(`error in calling url: ${url}`);
    }
}

export async function deleteData<T>(url: string): Promise<AxiosResponse<T>> {
    try {
        logger.info({ message: `call made to ${url}` });
        const response = await axios.delete(url);
        logger.info({ message: `response received: ${JSON.stringify(response.data)}` })

        return response
    } catch (error) {
        logger.info({ message: `error in receiving : error` })
        throw new Error(`error in calling url: ${url}`);
    }
}