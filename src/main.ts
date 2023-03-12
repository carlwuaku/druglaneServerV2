import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { ChildProcess, fork, SendHandle } from 'child_process'
import { isAppActivated, verifyLicenseKey } from "./appValidation";
import { logger } from "./app/config/logger";
// import isDev from 'electron-is-dev';

import { constants } from "./electronConstants";
import { ServerEvents } from "./utils/ServerEvents";
import { GET_APP_DETAILS, GET_SERVER_STATE, GET_SERVER_URL, SERVER_MESSAGE_RECEIVED, SERVER_STATE_CHANGED, SERVER_URL_RECEIVED, SERVER_URL_UPDATED } from "./utils/stringKeys";
import { runFolderCreation } from "./utils/directorySetup";
// import { startServer } from "./server/server";
let mainWindow: BrowserWindow;
let serverProcess: ChildProcess = null;
let serverState: "Application Activated" |
    "Application Not Activated" | "Server Started" | "Checking Activation"
    | "Server Starting" | "Server Stopping" = "Checking Activation";
const isDev = process.env.NODE_ENV == "development"

const serverEventEmitter = new ServerEvents();
let serverUrl = "";

// global.shared = {ipcMain}
//create backup folders
runFolderCreation();

ipcMain.on("call_validation", (event, item) => {
    event.reply()
    verifyLicenseKey("A78D5-B93FB-CD281-3500A");
mainWindow.webContents.send("license_called","true")}
)

ipcMain.on(GET_APP_DETAILS, getAppDetails)
ipcMain.on(GET_SERVER_STATE, () => {
    sendServerState(serverState)
})

ipcMain.on(GET_SERVER_URL, sendServerUrl)


function getAppDetails() {
    const title = `${constants.appname} v${app.getVersion()}`
    mainWindow.webContents.send("appDetailsSent", {title})
}

function sendServerState(state:string) {
    mainWindow.webContents.send(SERVER_STATE_CHANGED, state)

}

serverEventEmitter.on(SERVER_STATE_CHANGED, (data) => {
    console.log("event emitter ", data);
    serverState = data;
    sendServerState(data);
})

serverEventEmitter.on(SERVER_MESSAGE_RECEIVED, (data) => {
    console.log("event emitter message ", data);
    mainWindow.webContents.send(SERVER_MESSAGE_RECEIVED, data)

})
serverEventEmitter.on(SERVER_URL_UPDATED, (data) => {
    serverUrl = data;
    console.log("event emitter server url updated ", data);
    sendServerUrl();
})

function sendServerUrl() {
    console.log("server url changed ", serverUrl);

    mainWindow.webContents.send(SERVER_URL_RECEIVED, serverUrl)
}


function createWindow(htmlLocation: string, preloadLocation?: string) {
    // Create the browser window.
    //TODO: Check if null.
     mainWindow = new BrowserWindow({
        height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
            //  preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    });

    // and load the index.html of the app.
    // mainWindow.loadFile(path.join(__dirname, htmlLocation));
    mainWindow.loadURL(isDev ? 'http://localhost:9000' : `file://${app.getAppPath()}/index.html`)
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow("/app/index.html","@/app/index.preload.js");
    spawnServer();
    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow("/app/index.html", "@/app/index.preload.js");

        spawnServer();
    });

    //
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        //kill the server process
        if (serverProcess != null) {
            try {
                serverProcess.kill();
            } catch (error) {
                logger.error({ message: error });
            }
            
        }
        logger.info({ message: "app terminated" });
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// startServer();
export async function spawnServer() {
    try {
        serverEventEmitter.emit(SERVER_STATE_CHANGED, "Checking Activation")
        //check if the app is activated. if it is, start the server. else go the activation page
        const appActivated = await isAppActivated();
        if (appActivated) {
            serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Starting")

            //spawn server->runmigrations
            const serverPath = path.join(__dirname, 'server/server')
             serverProcess = fork(serverPath)

            serverProcess.on('exit', (code: number, signal) => {
                logger.error('serverProcess process exited with ' +
                    `code ${code} and signal ${signal}`);
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server stopped")
            });
            serverProcess.on('error', (error) => {
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Error: "+error)
                console.log('serverProcess process error ', error)
            });

            serverProcess.on('spawn', () => {
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Running")
                console.log('serverProcess spawned')
                //TODO: check if the company details has been set. then check if the admin password has been set
            
            });
            serverProcess.on('disconnect', () => {
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Disconnected")
                console.log('serverProcess disconnected')
            })
            serverProcess.on('message', (message:any, handle: SendHandle) => {
                
                serverEventEmitter.emit(message.event, message.message)
                // console.log("serverProcess sent a message", message)
            });

         }
        else {
            serverEventEmitter.emit(SERVER_STATE_CHANGED, "App not activated")
            console.log("app not activated")
            loadActivationPage();
        }
    } catch (error) {
        //start the server the old fashioned way
        serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Error "+ error)

        console.log(error)
    }
}

export function loadActivationPage(): void {
    createWindow("/app/activate.html","/app/activate.js")
    
}





