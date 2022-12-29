


require('ts-node/register')

import { Store } from '../../Store';
import { Umzug, SequelizeStorage } from 'umzug';
import { manualMigrations } from './manualMigrations';
import { constants } from '../../constants';
import { migrationsList } from './migrationsList';
const store = new Store()
import { sequelize } from '../sequelize-config'
import { logger } from '../logger';
// const sequelize = require('../models/sequelize-config')

// const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite' });

const umzug = new Umzug({

    migrations: migrationsList ,
  context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});



// export the type helper exposed by umzug, which will have the `context` argument typed correctly
export type Migration = typeof umzug._types.migration;
export const runMigrations =
  (async () => {
    
    try {
      
      for (var i = 0; i < manualMigrations.length; i++) {
        const mig = manualMigrations[i];
        if (mig.query.trim().length > 1) {
          const result = await sequelize.transaction(async (t) => {
            await sequelize.query(mig.query, {
              transaction: t
            });
          })
          
        } 
        
        //update the version in the system-settings file
        store.set(constants.STRING_DB_VERSION, mig.version.toString())
        // console.log('manual migration ' + mig.version)
      }
    
      await umzug.up();
    } catch (error) {
      logger.error(error)
      // if (error instanceof Error) {
        
      //   console.log('manual migration error', error.message )
        
      // }
      throw new Error("Migration error:" + error);
      
    }
   
    
});