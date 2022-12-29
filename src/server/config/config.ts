import { logger } from './logger';
import { constants } from '../constants'

export const config: {[key:string]: any}= {
    "development": {
        "dialect": "sqlite",
        "storage": constants.db_path,
        logging: (msg: any) => logger.debug(msg),
    },
    "test": {
        "dialect": "sqlite",
        "storage": "test_db.db",
        "logging": false
        // logging: (msg: any) => logger.debug(msg),
    },
    "production": {
        "dialect": "sqlite",
        "storage": constants.db_path,
        logging: (msg: any) => logger.debug(msg),
    }
}