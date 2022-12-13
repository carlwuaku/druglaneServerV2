/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appValidation.ts":
/*!******************************!*\
  !*** ./src/appValidation.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.isValidInt = exports.isAppActivated = void 0;\r\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\r\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\n// import { Settings } from './server/models/Settings';\r\n//check if the database file exists. if it does, then the app has been validated.\r\nconst isAppActivated = () => {\r\n    return fs.existsSync(constants_1.constants.db_path);\r\n};\r\nexports.isAppActivated = isAppActivated;\r\n////THESE FUNCTIONS HAVE BEEN MOVED TO SERVER APPVALIDATION FOR THE SAKE OF BUNDLING WITH WEBPACK///\r\n/**\r\n * checks the database if the company details have been set\r\n * @returns {boolean}\r\n */\r\n// export async function isCompanySet(): Promise<boolean>{\r\n//     //get a connection to the database\r\n//     const setting = await Settings.findOne({\r\n//         where: {\r\n//             'name': 'company_id'\r\n//         }\r\n//     });\r\n//     if (setting == null) {\r\n//         return false;\r\n//     }\r\n//     //check if the actual value exists and is a valid number\r\n//     return isValidInt(setting.value) ;\r\n// }\r\n/**\r\n * check the database if the admin password is set\r\n * @returns {boolean}\r\n */\r\n// export async function isAdminPasswordSet(): Promise<boolean>{\r\n//     const setting = await Settings.findOne({\r\n//         where: {\r\n//             'name': 'admin_password'\r\n//         }\r\n//     });\r\n//     if (setting == null) {\r\n//         return false;\r\n//     }\r\n//     //check if the actual value exists and is a valid string\r\n//     return setting.value.trim().length > 0;\r\n// }\r\nfunction isValidInt(value) {\r\n    return value != null && Number.isInteger(value);\r\n}\r\nexports.isValidInt = isValidInt;\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/appValidation.ts?");

/***/ }),

/***/ "./src/app/config/mongoose.ts":
/*!************************************!*\
  !*** ./src/app/config/mongoose.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.connectDB = void 0;\r\nconst logger_1 = __webpack_require__(/*! @/server/config/logger */ \"./src/server/config/logger.ts\");\r\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    try {\r\n        const connection = yield mongoose_1.default\r\n            .connect(`mongodb+srv://carl:pass1234@cluster0.ai5biiv.mongodb.net/?retryWrites=true&w=majority`);\r\n        logger_1.logger.info('mongo db ocnnected');\r\n    }\r\n    catch (error) {\r\n        logger_1.logger.error(error);\r\n    }\r\n});\r\nexports.connectDB = connectDB;\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/app/config/mongoose.ts?");

/***/ }),

/***/ "./src/app/models/Log.ts":
/*!*******************************!*\
  !*** ./src/app/models/Log.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nconst LogSchema = new mongoose_1.default.Schema({\r\n    text: {\r\n        type: String,\r\n        trim: true,\r\n        required: [true, 'Log text required']\r\n    },\r\n    priority: {\r\n        type: String,\r\n        default: 'log',\r\n        enum: ['low', 'moderate', 'high']\r\n    },\r\n    user: {\r\n        type: String,\r\n        trim: true,\r\n        required: [true, 'User is required']\r\n    },\r\n    created: {\r\n        type: Date,\r\n        default: Date.now\r\n    }\r\n});\r\nexports[\"default\"] = mongoose_1.default.model('Log', LogSchema);\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/app/models/Log.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.constants = void 0;\r\nconst PORT = process.env.PORT || 5100;\r\n// const appName = \"Shoplane\";\r\n// const appLongName = \"Shoplane POS & Inventory Management System\";\r\n// const databaseName = \"shoplane.db\";\r\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst os_1 = __importDefault(__webpack_require__(/*! os */ \"os\"));\r\nconst appName = \"Druglane\";\r\nconst appLongName = \"Druglane Pharmacy Management System\";\r\nconst databaseName = \"druglanev1.db\";\r\nconst appDirectory = \"druglaneServerV1\";\r\nconst settings_location = path_1.default.join(process.env.APPDATA, appDirectory);\r\nexports.constants = {\r\n    appLongName: appLongName,\r\n    appname: appName,\r\n    server_url:  false ?\r\n        0 : \"http://localhost/druglanebackend\",\r\n    settings_location,\r\n    customer_image_url: \"assets/customer_images/\",\r\n    customer_image_thumbnail_url: \"assets/customer_images/thumbnails/\",\r\n    product_image_url: \"assets/product_images/\",\r\n    product_image_thumbnail_url: \"assets/product_images/thumbnails/\",\r\n    port: PORT,\r\n    firebase_user_collection: \"users\",\r\n    firebase_requests_collection: \"requests\",\r\n    firebase_responses_collection: \"responses\",\r\n    settings_path: path_1.default.join(settings_location, 'system-settings.json'),\r\n    db_path: path_1.default.join(settings_location, databaseName),\r\n    backup_folder: path_1.default.join(os_1.default.homedir(), `${appName}Backups`),\r\n    settings_filename: 'system-settings.json',\r\n    db_filename: databaseName,\r\n    internal_backups_path: path_1.default.join(settings_location, 'backups'),\r\n    company_id: '',\r\n    default_functional_groups: [\r\n        \"Adult Analgesics Tablets\",\r\n        \"Adult Analgesics Suppositories\",\r\n        \"Paediatric Analgesics Syrups\",\r\n        \"Paediatric Analgesics Suppositories\",\r\n        \"Adult Dry Cough Syrups\",\r\n        \"Adult Expectorant Syups\",\r\n        \"Adult Cough & Cold Syrups\",\r\n        \"Adult Dry Cough Tablets\",\r\n        \"Adult Expectorant Tablets\",\r\n        \"Adult Cough & Cold Tablets\",\r\n        \"Baby Cough Syrups (0-1 years)\",\r\n        \"Child Cough Syrups (up to 6 years)\",\r\n        \"Child Cough Syrups (up to 12 years)\",\r\n        \"Adult Catarrh Syrups\",\r\n        \"Adult Catarrh Tablets\",\r\n        \"Paediatric Catarrh Syrups\",\r\n        \"Adult Blood Tonics\",\r\n        \"Adult Multivitamins\",\r\n        \"Paediatric Blood Tonics\",\r\n        \"Paediatric Multivitamins\"\r\n    ],\r\n    default_config: {\r\n        port: PORT,\r\n        host: \"localhost\",\r\n        dbversion: 0,\r\n        admin_set: 'no',\r\n        company_set: 'no',\r\n        auto_backup_time: 19,\r\n        last_sync: 0,\r\n        env: \"production\"\r\n    },\r\n    PERMISSION_VIEW_USER_ACTIVITIES: \"View Sales History\",\r\n    PERMISSION_VIEW_PURCHASE_HISTORY: \"View Purchase History\",\r\n    PERMISSION_VIEW_INVENTORY: \"View Inventory\",\r\n    PERMISSION_VIEW_END_OF_DAY_REPORT: \"View End Of Day Report\",\r\n    PERMISSION_VIEW_ACCOUNTS: \"View Accounts\",\r\n    PERMISSION_TRANSFER_ITEMS: \"Transfer Items\",\r\n    PERMISSION_RETURN_SOLD_ITEMS: \"Return Sold Items\",\r\n    PERMISSION_RECEIVE_TRANSFERS: \"Receive Transfers\",\r\n    PERMISSION_RECEIVE_PURCHASES: \"Receive Purchases\",\r\n    PERMISSION_MANAGE_VENDORS: \"Manage Vendors\",\r\n    PERMISSION_MANAGE_STAFF: \"Manage Staff\",\r\n    PERMISSION_MANAGE_SETTINGS: \"Manage Settings\",\r\n    PERMISSION_MANAGE_INVENTORY: \"Manage Inventory\",\r\n    PERMISSION_MANAGE_CUSTOMERS: \"Manage Customers\",\r\n    PERMISSION_MANAGE_ACCOUNTS: \"Manage Accounts\",\r\n    PERMISSION_GIVE_DISCOUNT: \"Give Discount\",\r\n    PERMISSION_EDIT_SALES: \"Edit Sales\",\r\n    PERMISSION_DELETE_TRANSFERS: \"Delete Transfers\",\r\n    PERMISSION_DELETE_SALES_RECORDS: \"Sales Records\",\r\n    PERMISSION_DELETE_PURCHASES: \"Delete Purchases\",\r\n    PERMISSION_CREATE_SALES: \"Create Sales\",\r\n    PERMISSION_ADJUST_STOCK: \"Adjust Stock\",\r\n    PERMISSION_VIEW_TRANSFER_HISTORY: \"View Transfer History\",\r\n    PERMISSION_VIEW_SALES_REPORTS: \"View Sales Reports\",\r\n    PERMISSION_VIEW_SALES_HISTORY: \"View Sales History\",\r\n    STRING_DB_VERSION: \"dbversion\",\r\n};\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/constants.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.loadActivationPage = exports.spawnServer = void 0;\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst path = __importStar(__webpack_require__(/*! path */ \"path\"));\r\nconst child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\r\nconst appValidation_1 = __webpack_require__(/*! ./appValidation */ \"./src/appValidation.ts\");\r\nconst logger_1 = __webpack_require__(/*! ./server/config/logger */ \"./src/server/config/logger.ts\");\r\nconst electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ \"electron-is-dev\"));\r\nconst mongoose_1 = __webpack_require__(/*! @/app/config/mongoose */ \"./src/app/config/mongoose.ts\");\r\nconst Log_1 = __importDefault(__webpack_require__(/*! @/app/models/Log */ \"./src/app/models/Log.ts\"));\r\n// import { startServer } from \"./server/server\";\r\nlet mainWindow;\r\nlet serverProcess = null;\r\nlet startupState = \"Checking Activation\";\r\n//connect to mongo db\r\n(0, mongoose_1.connectDB)();\r\n//IOPC CONNECTION\r\nelectron_1.ipcMain.on(\"logs:load\", sendLogs);\r\n//get the logs from mongo, and push to front end\r\nfunction sendLogs() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        try {\r\n            const logs = yield Log_1.default.find().sort({ created: 1 });\r\n            mainWindow.webContents.send('logs:get', JSON.stringify(logs));\r\n            console.log(logs);\r\n        }\r\n        catch (error) {\r\n            logger_1.logger.error(error);\r\n        }\r\n    });\r\n}\r\nfunction createWindow(htmlLocation, preloadLocation) {\r\n    // Create the browser window.\r\n    mainWindow = new electron_1.BrowserWindow({\r\n        height: 600,\r\n        webPreferences: {\r\n            nodeIntegration: true,\r\n            contextIsolation: false,\r\n            preload: \"@/app/index.preload.js\",\r\n        },\r\n        width: 800,\r\n    });\r\n    // and load the index.html of the app.\r\n    mainWindow.loadFile(path.join(__dirname, htmlLocation));\r\n    mainWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:9000' : `file://${electron_1.app.getAppPath()}/index.html`);\r\n    // Open the DevTools.\r\n    mainWindow.webContents.openDevTools();\r\n}\r\n// This method will be called when Electron has finished\r\n// initialization and is ready to create browser windows.\r\n// Some APIs can only be used after this event occurs.\r\nelectron_1.app.whenReady().then(() => {\r\n    createWindow(\"/app/index.html\", \"@/app/index.preload.js\");\r\n    spawnServer();\r\n    electron_1.app.on(\"activate\", function () {\r\n        // On macOS it's common to re-create a window in the app when the\r\n        // dock icon is clicked and there are no other windows open.\r\n        if (electron_1.BrowserWindow.getAllWindows().length === 0)\r\n            createWindow(\"/app/index.html\", \"@/app/index.preload.js\");\r\n        spawnServer();\r\n    });\r\n    //\r\n});\r\n// Quit when all windows are closed, except on macOS. There, it's common\r\n// for applications and their menu bar to stay active until the user quits\r\n// explicitly with Cmd + Q.\r\nelectron_1.app.on(\"window-all-closed\", () => {\r\n    if (process.platform !== \"darwin\") {\r\n        //kill the server process\r\n        if (serverProcess != null) {\r\n            try {\r\n                serverProcess.kill();\r\n            }\r\n            catch (error) {\r\n                logger_1.logger.error(error);\r\n            }\r\n        }\r\n        logger_1.logger.info(\"app terminated\");\r\n        electron_1.app.quit();\r\n    }\r\n});\r\n// In this file you can include the rest of your app\"s specific main process\r\n// code. You can also put them in separate files and require them here.\r\n// startServer();\r\nfunction spawnServer() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        try {\r\n            //check if the app is activated. if it is, start the server. else go the activation page\r\n            const appActivated = yield (0, appValidation_1.isAppActivated)();\r\n            if (appActivated) {\r\n                console.log(\"app activated\");\r\n                //spawn server->runmigrations\r\n                const serverPath = path.join(__dirname, 'server/server');\r\n                serverProcess = (0, child_process_1.fork)(serverPath);\r\n                serverProcess.on('exit', (code, signal) => {\r\n                    console.log('serverProcess process exited with ' +\r\n                        `code ${code} and signal ${signal}`);\r\n                });\r\n                serverProcess.on('error', (error) => {\r\n                    console.log('serverProcess process error ', error);\r\n                });\r\n                serverProcess.on('spawn', () => {\r\n                    console.log('serverProcess spawned');\r\n                    //check if the company details has been set. then check if the admin password has been set\r\n                });\r\n                serverProcess.on('disconnect', () => {\r\n                    console.log('serverProcess disconnected');\r\n                });\r\n                serverProcess.on('message', (message, handle) => {\r\n                    console.log(\"serverProcess sent a message\", message);\r\n                });\r\n            }\r\n            else {\r\n                console.log(\"app not activated\");\r\n                loadActivationPage();\r\n            }\r\n        }\r\n        catch (error) {\r\n            //start the server the old fashioned way\r\n            console.log(error);\r\n        }\r\n    });\r\n}\r\nexports.spawnServer = spawnServer;\r\nfunction loadActivationPage() {\r\n    createWindow(\"/app/activate.html\", \"/app/activate.js\");\r\n}\r\nexports.loadActivationPage = loadActivationPage;\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/main.ts?");

/***/ }),

/***/ "./src/server/config/logger.ts":
/*!*************************************!*\
  !*** ./src/server/config/logger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"logger\": () => (/* binding */ logger)\n/* harmony export */ });\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst logger = winston__WEBPACK_IMPORTED_MODULE_0__.createLogger({\r\n    level: 'info',\r\n    format: winston__WEBPACK_IMPORTED_MODULE_0__.format.json(),\r\n    defaultMeta: { service: 'user-service' },\r\n    transports: [\r\n        //\r\n        // - Write all logs with importance level of `error` or less to `error.log`\r\n        // - Write all logs with importance level of `info` or less to `combined.log`\r\n        //\r\n        new winston__WEBPACK_IMPORTED_MODULE_0__.transports.File({ filename: 'error.log', level: 'error' }),\r\n        new winston__WEBPACK_IMPORTED_MODULE_0__.transports.File({ filename: 'combined.log' }),\r\n    ],\r\n});\r\n\r\n//\r\n// If we're not in production then log to the `console` with the format:\r\n// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `\r\n//\r\nif (true) {\r\n    logger.add(new winston__WEBPACK_IMPORTED_MODULE_0__.transports.Console({\r\n        format: winston__WEBPACK_IMPORTED_MODULE_0__.format.simple(),\r\n    }));\r\n}\r\n\r\n\n\n//# sourceURL=webpack://druglaneserver/./src/server/config/logger.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "electron-is-dev":
/*!**********************************!*\
  !*** external "electron-is-dev" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("electron-is-dev");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;