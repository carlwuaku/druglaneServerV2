import { COMPANY_NAME_RECEIVED, GET_SERVER_STATE, GET_SERVER_URL, RESTART_SERVER, SERVER_MESSAGE_RECEIVED, SERVER_RUNNING, SERVER_STARTING, SERVER_STATE_CHANGED, SERVER_STOPPED, SERVER_URL_RECEIVED } from "@/utils/stringKeys";
import { ipcRenderer } from "electron";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const ServerState = () => {
    const [serverState, setServerState] = useState("...");
    const [serverUrl, setServerUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const title = "Server State";
    const subtitle = "Shows the state of the main application server";
    const restartButton = <Button loading={loading} onClick={restartServer} label="Restart" icon="pi pi-refresh" />
    
    function restartServer() {
        setLoading(true);
        ipcRenderer.send(RESTART_SERVER);
    };

    useEffect(() => {
        ipcRenderer.send(GET_SERVER_STATE);

        ipcRenderer.send(GET_SERVER_URL);

        ipcRenderer.on(SERVER_STATE_CHANGED, (event: any, data: any) => {
            console.log(SERVER_STATE_CHANGED, data.data)
            setLoading(false)
            setServerState(data.data)
        });



        ipcRenderer.on(SERVER_URL_RECEIVED, (event: any, data: any) => {
            console.log(SERVER_URL_RECEIVED, data.data)
            setServerUrl(data.data)
        })



    }, [])
    switch (serverState) {
        case SERVER_RUNNING:
            return <Card  title="Server State" subTitle="Shows the state of the main application server" >
                <p className="m-0">
                    {serverState}</p>
                <div>
                    <h4>Connect to the server</h4>
                    <div>
                        To run the client on other computers or phones <strong>connected to the same network</strong> , open a browser (preferably
                        Google Chrome, Microsoft Edge or Firefox) on the device,
                        and enter the following url in the address bar:
                        {serverUrl}/client. Alternatively, scan this QR code on a mobile device:
                        <div>
                            <QRCode value={serverUrl+"/client"} />
                        </div>
                    </div>
                </div>

            </Card>
        case SERVER_STARTING:
            return <Card title="Server State" subTitle="Shows the state of the main application server" >
                <p className="m-0">
                    {serverState}</p>
                <div>
                    <h4></h4>
                    <div>
                        Please wait for the server to get fired up!
                    </div>
                </div>

            </Card>

        default:
            return <Card title={title} subTitle={subtitle} footer={(
                <div className="flex flex-wrap justify-content-end gap-2">
                    {restartButton}
                </div>
            )} >
                <p className="m-0">
                    {serverState}</p>
                <div>
                    <div>
                        The server process has stopped. Use the controls to restart it
                    </div>
                </div>

            </Card>
    }
}

export default ServerState