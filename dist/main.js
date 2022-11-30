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
exports.loadActivationPage = exports.spawnServer = void 0;
const electron_1 = require("electron");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const appValidation_1 = require("./appValidation");
const logger_1 = require("./server/config/logger");
// import { startServer } from "./server/server";
let mainWindow;
let serverProcess = null;
function createWindow(htmlLocation, preloadLocation) {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, preloadLocation),
        },
        width: 800,
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, htmlLocation));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow("/app/index.html", "/app/index.js");
    spawnServer();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow("/app/index.html", "/app/index.js");
        spawnServer();
    });
    //
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        //kill the server process
        if (serverProcess != null) {
            try {
                serverProcess.kill();
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        }
        logger_1.logger.info("app terminated");
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// startServer();
function spawnServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check if the app is activated. if it is, start the server. else go the activation page
            const appActivated = yield (0, appValidation_1.isAppActivated)();
            if (appActivated) {
                //spawn server->runmigrations
                const serverPath = path.join(__dirname, 'server/server');
                serverProcess = (0, child_process_1.fork)(serverPath);
                serverProcess.on('exit', (code, signal) => {
                    console.log('serverProcess process exited with ' +
                        `code ${code} and signal ${signal}`);
                });
                serverProcess.on('error', (error) => {
                    console.log('serverProcess process error ', error);
                });
                serverProcess.on('spawn', () => {
                    console.log('serverProcess spawned');
                    //check if the company details has been set. then check if the admin password has been set
                });
                serverProcess.on('disconnect', () => {
                    console.log('serverProcess disconnected');
                });
                serverProcess.on('message', (message, handle) => {
                    console.log("serverProcess sent a message", message);
                });
            }
            else {
                loadActivationPage();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.spawnServer = spawnServer;
function loadActivationPage() {
    createWindow("/app/activate.html", "/app/activate.js");
}
exports.loadActivationPage = loadActivationPage;
