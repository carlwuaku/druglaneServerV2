import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";
import { ChildProcess, fork, SendHandle } from 'child_process'
import { isAppActivated, verifyLicenseKey } from "./appValidation";
import { logger } from "./app/config/logger";
// import isDev from 'electron-is-dev';

import { constants, defaultOptions } from "./electronConstants";
import { ServerEvents } from "./utils/ServerEvents";
import { ACTIVATION_RESULT, CALL_ACTIVATION, GET_APP_DETAILS, GET_PREFERENCE, GET_SERVER_STATE, GET_SERVER_URL, PREFERENCE_RECEIVED, PREFERENCE_SET, RESTART_APPLICATION, RESTART_SERVER, SERVER_MESSAGE_RECEIVED, SERVER_STATE_CHANGED, SERVER_URL_RECEIVED, SERVER_URL_UPDATED, SET_PREFERENCE } from "./utils/stringKeys";
import { runFolderCreation } from "./utils/directorySetup";
import Store from "electron-store";
import contextMenu from 'electron-context-menu'
//A78D5-B93FB-CD281-3500A
// import { startServer } from "./server/server";
const gotTheLock = app.requestSingleInstanceLock()

let mainWindow: BrowserWindow;
let serverProcess: ChildProcess;
let serverState: "Application Activated" |
    "Application Not Activated" | "Server Started" | "Checking Activation"
    | "Server Starting" | "Server Stopping" = "Checking Activation";
const isDev = process.env.NODE_ENV == "development";

//the first instance of the app will have gotTheLock = true. else it will be fls
if (!gotTheLock) {
    app.quit();


} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow != null && mainWindow != undefined) {
            if (mainWindow.isMinimized()) { mainWindow.restore() }
            mainWindow.focus()
        }
    })
}
const serverEventEmitter = new ServerEvents();
let serverUrl = "";
const store = new Store();
//save all 
let logs: string[] = [];

contextMenu({
    showSaveImageAs: true
});
// global.shared = {ipcMain}
//create backup folders
runFolderCreation();

ipcMain.on(CALL_ACTIVATION, async (event, key) => {
    try {
        let data = await verifyLicenseKey(key);
        mainWindow?.webContents?.send(ACTIVATION_RESULT, { data: data.data, error: false, message: "" })
    } catch (error) {
        mainWindow?.webContents?.send(ACTIVATION_RESULT, { data: null, error: true, message: error })
    }


}
)

ipcMain.on(GET_APP_DETAILS, getAppDetails)
ipcMain.on(GET_SERVER_STATE, () => {
    sendServerState(serverState)
})

ipcMain.on(RESTART_SERVER, async (event, data) => {
    await spawnServer()
})

ipcMain.on(RESTART_APPLICATION, async (event, data) => {
    restartApp()
})

ipcMain.on(GET_SERVER_URL, sendServerUrl)

ipcMain.on(GET_PREFERENCE, (event, data: { key: string }) => {
    
    let value = store.get(data.key, defaultOptions[data.key])
    console.log(data.key, value)
    event.reply(PREFERENCE_RECEIVED, value)
}
)

ipcMain.on(SET_PREFERENCE, (event, data: { key: string, value: any }) => {
    try {
        savePreference(data.key, data.value); 
        event.reply(PREFERENCE_SET, {success: true, message:"Setting saved successfully"})
    } catch (error) {
        event.reply(PREFERENCE_SET, { success: false, message: error })

    }
    
   
})

function savePreference(key: string, value: any) {
    try {
        console.log(key, value)
        store.set(key, value);
    } catch (error:any) {
        throw new Error(error);
        
    }
    
}

function getAppDetails() {
    const title = `${constants.appname} v${app.getVersion()}`
    mainWindow?.webContents?.send("appDetailsSent", { title })
}

function restartApp() {
    app.relaunch()
    app.exit()
}

function sendServerState(state: string) {
    mainWindow?.webContents?.send(SERVER_STATE_CHANGED, { data: state, time: new Date().toLocaleString() })

}

serverEventEmitter.on(SERVER_STATE_CHANGED, (data) => {
    console.log("event emitter ", data);
    logs.unshift(data);
    serverState = data;
    sendServerState(data);
})

serverEventEmitter.on(SERVER_MESSAGE_RECEIVED, (data) => {
    console.log("event emitter message ", data);
    logs.unshift(data);
    mainWindow?.webContents?.send(SERVER_MESSAGE_RECEIVED, { data, time: new Date().toLocaleString() })

})
serverEventEmitter.on(SERVER_URL_UPDATED, (data) => {
    serverUrl = data;
    logs.unshift(data);
    console.log("event emitter server url updated ", data);
    sendServerUrl();
})

function sendServerUrl() {
    console.log("server url changed ", serverUrl);

    mainWindow?.webContents?.send(SERVER_URL_RECEIVED, { data: serverUrl, time: new Date().toLocaleString() }, serverUrl)
}


function createWindow(htmlLocation: string, preloadLocation?: string) {
    // Create the browser window.
    //TODO: Check if null.
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            spellcheck: true
            //  preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    });

    // and load the index.html of the app.
    // mainWindow.loadFile(path.join(__dirname, htmlLocation));
    mainWindow?.loadURL(isDev ? 'http://localhost:9000' : `file://${app.getAppPath()}/index.html`)
    // Open the DevTools.
    mainWindow?.webContents?.openDevTools();
    Menu.setApplicationMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow("/app/index.html", "@/app/index.preload.js");
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
                logger.error({
                    message: 'serverProcess process exited with ' +
                        `code ${code} and signal ${signal}`
                });
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Stopped")
            });
            serverProcess.on('error', (error) => {
                serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Error")
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
            });

            serverProcess.on('message', (message: any, handle: SendHandle) => {
                console.log("serverProcess sent a message", message)

                serverEventEmitter.emit(message.event, message.message)
            });

        }
        else {
            serverEventEmitter.emit(SERVER_STATE_CHANGED, "App not activated")
            console.log("app not activated")
            loadActivationPage();
        }
    } catch (error) {
        //start the server the old fashioned way
        serverEventEmitter.emit(SERVER_STATE_CHANGED, "Server Error " + error)

        console.log(error)
    }
}

export function loadActivationPage(): void {
    createWindow("/app/activate.html", "/app/activate.js")

}





