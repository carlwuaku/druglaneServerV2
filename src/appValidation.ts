import * as fs from 'fs';
import { logger } from './app/config/logger';
import { constants } from './electronConstants';
import { getData } from './utils/network';
//check if the database file exists. if it does, then the app has been validated.
export const isAppActivated = ():boolean => {
    return fs.existsSync(constants.db_path)
}

export async function verifyLicenseKey(key: string):Promise<any> {
    
    try {
        console.log("calling verify license")
        
        return getData({url: `${constants.server_url}/api_admin/findBranchByKey?k=${key}`, token: ""})
       
    } catch (error: any) {
        console.log("verify key", error)
        logger.error({ message: error })
        throw new Error(error)
        
    }
    
}//3Wordsnocaps!