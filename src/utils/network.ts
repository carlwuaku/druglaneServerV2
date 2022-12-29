import { logger } from "@/app/config/logger";
import { ClientRequest, net } from "electron";

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

        })
        
        return request;
    } catch (error) {
        console.log(error)
        logger.error({ message: error });
        throw new Error("Network Error");
        
    }
    
}