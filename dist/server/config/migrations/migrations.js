"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = void 0;
require('ts-node/register');
const Store_1 = require("../../Store");
const umzug_1 = require("umzug");
const manualMigrations_1 = require("./manualMigrations");
const constants_1 = require("../../../constants");
const migrationsList_1 = require("./migrationsList");
const store = new Store_1.Store();
const sequelize_config_1 = require("../../models/sequelize-config");
// const sequelize = require('../models/sequelize-config')
// const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite' });
const umzug = new umzug_1.Umzug({
    migrations: migrationsList_1.migrationsList,
    context: sequelize_config_1.sequelize.getQueryInterface(),
    storage: new umzug_1.SequelizeStorage({ sequelize: sequelize_config_1.sequelize }),
    logger: console,
});
exports.runMigrations = (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (var i = 0; i < manualMigrations_1.manualMigrations.length; i++) {
            const mig = manualMigrations_1.manualMigrations[i];
            if (mig.query.trim().length > 1) {
                const result = yield sequelize_config_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
                    yield sequelize_config_1.sequelize.query(mig.query);
                }));
            }
            //update the version in the system-settings file
            store.set(constants_1.constants.STRING_DB_VERSION, mig.version.toString());
            // console.log('manual migration ' + mig.version)
        }
        yield umzug.up();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('manual migration error', error.message);
            throw new Error("Migration error:" + error.message);
        }
    }
}));
