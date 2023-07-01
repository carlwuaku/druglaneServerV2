import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';

import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import '@fontsource/lato';
import '@fontsource/ubuntu';
import '@/style.scss'
import { HashRouter, Route, Routes } from "react-router-dom";
import Activate from "./app/pages/activate";
import Index from "./app/pages";
import NotFound from "./app/pages/notFound";
import SettingsPage from "./app/pages/settings";
import SetAdminPassword from "./app/pages/setAdminPasswordPage";
import Roles from "./app/pages/roles";
import AddRole from "./app/pages/addRole";
import Users from "./app/pages/users";
import AddUser from "./app/pages/addUser";
import GlobalContext from "./app/global/global";
import GlobalProvider from "./app/global/globalProvider";
import { ipcRenderer } from "electron";
import { getData } from "./utils/network";
import { GET_SERVER_URL, SERVER_URL_RECEIVED } from "./utils/stringKeys";

const appDataContext = createContext({
    serverUrl: "",
    companyName: ""
});

export default function App() {
    let appState = {
        serverUrl: "",
        companyName: ""
    };
    const { serverUrl, setServerUrl, setCompanyName } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getServerData = async () => {
            const handleServerUrlReceived = async (event: any, data: any) => {
                let serverUrl = data.data;
                //get the settings
                const getSettings = await getData<any>(`${serverUrl}/api_admin/settings`);
                console.log('reactrendere getsettings', getSettings)

                setCompanyName(getSettings.data.company_name);
                setLoading(false);
                ipcRenderer.removeListener(SERVER_URL_RECEIVED, handleServerUrlReceived);
            }
            ipcRenderer.send(GET_SERVER_URL);

            ipcRenderer.on(SERVER_URL_RECEIVED, handleServerUrlReceived);
            
        }

        getServerData();
    
    }, [setServerUrl, setCompanyName])
    

    
    return (
            loading? <div>Loading...</div>:
            <GlobalProvider>
                
           
            <div>
                <CssBaseline />
                <Routes>

                    <Route path='/activate' element={<Activate />} />
                    <Route path='/help' element={<Index />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/adminPassword' element={<SetAdminPassword />} />
                    <Route path='/roles' element={<Roles />} />
                    <Route path='/addRole' element={<AddRole />} />
                    <Route path='/addRole/:id' element={<AddRole />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/addUser' element={<AddUser />} />
                    <Route path='/addUser/:id' element={<AddUser />} />
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </div>
        </GlobalProvider>
        
    )
}
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<HashRouter><App /></HashRouter>);
// ReactDOM.render(<BrowserRouter><App /></BrowserRouter> , document.getElementById('root'));