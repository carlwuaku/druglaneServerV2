import { logger } from "@/app/config/logger";
import { ClientRequest, net } from "electron";

/**
 * make a get call to a url with some optional params
 * @param url the url to call
 * @param params a map of key-value pairs to append as parameters
 * @returns the clientrequest object
 */
export function getData(url:string, params?:Map<string, any>):ClientRequest {
    if(!net.isOnline) throw new Error("Offline");
    
    try {
        if (params) {
            let urlParams: string[] = [];
            params.forEach((value, key) => {
                urlParams.push(`${key}=${value}`)
            });
            url += "?" + urlParams.join("&")
        }
        const request = net.request(url);
        request.on("error", (error) => {
            console.log(error)
            logger.error(error)
            throw new Error("Network Error");
            
        })
        
        return request;
    } catch (error) {
        console.log(error)
        logger.error({ message: error });
        throw new Error("Network Error");
        
    }
    
}