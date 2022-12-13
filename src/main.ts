import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { ChildProcess, fork } from 'child_process'
import { isAppActivated } from "./appValidation";
import { logger } from "./server/config/logger";
import isDev from 'electron-is-dev';
import { connectDB } from '@/app/config/mongoose';
import Log from '@/app/models/Log';
// import { startServer } from "./server/server";
let mainWindow: BrowserWindow;
let serverProcess: ChildProcess = null;
let startupState: "Application Activated" |
    "Application Not Activated" | "Server Started" | "Checking Activation" = "Checking Activation";

//connect to mongo db
connectDB();

//IOPC CONNECTION
ipcMain.on("logs:load", sendLogs)



//get the logs from mongo, and push to front end
async function sendLogs() {
    try {
        const logs = await Log.find().sort({ created: 1 });
        mainWindow.webContents.send('logs:get', JSON.stringify(logs))
        console.log(logs)
    } catch (error) {
        logger.error(error)
    }
}

function createWindow(htmlLocation: string, preloadLocation?: string) {
    // Create the browser window.
     mainWindow = new BrowserWindow({
        height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
             preload: "@/app/index.preload.js",
        },
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, htmlLocation));
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
                logger.error(error);
            }
            
        }
        logger.info("app terminated");
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// startServer();
export async function spawnServer() {
    try {
        //check if the app is activated. if it is, start the server. else go the activation page
        const appActivated = await isAppActivated();
        if (appActivated) {
            console.log("app activated");
            //spawn server->runmigrations
            const serverPath = path.join(__dirname, 'server/server')
             serverProcess = fork(serverPath)

            serverProcess.on('exit', (code: number, signal) => {
                console.log('serverProcess process exited with ' +
                    `code ${code} and signal ${signal}`);
            });
            serverProcess.on('error', (error) => {
                console.log('serverProcess process error ', error)
            });

            serverProcess.on('spawn', () => {
                console.log('serverProcess spawned')
                //check if the company details has been set. then check if the admin password has been set
            
            });
            serverProcess.on('disconnect', () => {
                console.log('serverProcess disconnected')
            })
            serverProcess.on('message', (message, handle) => {
                console.log("serverProcess sent a message", message)
            });

         }
        else {
            console.log("app not activated")
            loadActivationPage();
        }
    } catch (error) {
        //start the server the old fashioned way
        
        console.log(error)
    }
}

export function loadActivationPage(): void {
    createWindow("/app/activate.html","/app/activate.js")
    
}




