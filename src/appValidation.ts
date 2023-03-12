import * as fs from 'fs';
import { logger } from './app/config/logger';
import { constants } from './electronConstants';
import { getData } from './utils/network';
//check if the database file exists. if it does, then the app has been validated.
export const isAppActivated = ():boolean => {
    return fs.existsSync(constants.db_path)
}

export async function verifyLicenseKey(key: string) {
    
    try {
        console.log("calling verify license")
        const options = new Map()
        options.set('k', key)
        const request = getData(`${constants.server_url}/api_admin/findBranchByKey`, options)
        
        request.on("response", (res) => {
            console.log("verify key response", res);
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`)
            });
        })
        
        // request.setHeader('Content-Type', 'application/json');
        request.end();
    
    } catch (error) {
        console.log("verify key", error)
        logger.error({ message: error })
    }
    
}//3Wordsnocaps!