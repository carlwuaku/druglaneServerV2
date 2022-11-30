"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isValidInt = exports.isAdminPasswordSet = exports.isCompanySet = exports.isAppActivated = void 0;
const fs = __importStar(require("fs"));
const constants_1 = require("./constants");
const Settings_1 = require("./server/models/Settings");
//check if the database file exists. if it does, then the app has been validated.
const isAppActivated = () => {
    return fs.existsSync(constants_1.constants.db_path);
};
exports.isAppActivated = isAppActivated;
/**
 * checks the database if the company details have been set
 * @returns {boolean}
 */
function isCompanySet() {
    return __awaiter(this, void 0, void 0, function* () {
        //get a connection to the database
        const setting = yield Settings_1.Settings.findOne({
            where: {
                'name': 'company_id'
            }
        });
        if (setting == null) {
            return false;
        }
        //check if the actual value exists and is a valid number
        return isValidInt(setting.value);
    });
}
exports.isCompanySet = isCompanySet;
/**
 * check the database if the admin password is set
 * @returns {boolean}
 */
function isAdminPasswordSet() {
    return __awaiter(this, void 0, void 0, function* () {
        const setting = yield Settings_1.Settings.findOne({
            where: {
                'name': 'admin_password'
            }
        });
        if (setting == null) {
            return false;
        }
        //check if the actual value exists and is a valid string
        return setting.value.trim().length > 0;
    });
}
exports.isAdminPasswordSet = isAdminPasswordSet;
function isValidInt(value) {
    return value != null && Number.isInteger(value);
}
exports.isValidInt = isValidInt;
