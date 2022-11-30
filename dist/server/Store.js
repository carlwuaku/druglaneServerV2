"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../constants");
// import log from 'electron-log'
class Store {
    constructor() {
        //path to save to. the remote.app comes in if we call the api from render
        this.path = constants_1.constants.settings_path;
        this.data = parseDataFile();
    }
    get(key) {
        return this.data[key];
    }
    set(key, val) {
        this.data[key] = val;
        fs_1.default.writeFileSync(this.path, JSON.stringify(this.data));
    }
}
exports.Store = Store;
function parseDataFile() {
    try {
        if (fs_1.default.existsSync(constants_1.constants.settings_path)) {
            // log.info('system-settings file found');
            return JSON.parse(fs_1.default.readFileSync(constants_1.constants.settings_path, 'utf-8'));
        }
        else {
            // log.info('system-settings not file found');
            return constants_1.constants.default_config;
        }
    }
    catch (error) {
        // log.error(error)
        console.log(error);
        return constants_1.constants.default_config;
    }
}
