import React, { } from "react";
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
import Login from "./app/pages/login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import ResetPassword from "./app/pages/resetPassword";


export default function App() {




    return (



        <div>
            <CssBaseline />
            <Routes>

                <Route path='/activate' element={<Activate />} />
                <Route path='/help' element={<Index />} />
                <Route path='/settings' element={<RequireAuth loginPath={"/login"} ><SettingsPage /></RequireAuth>} />
                <Route path='/adminPassword' element={<SetAdminPassword />} />
                <Route path='/roles' element={<RequireAuth loginPath={"/login"} ><Roles /></RequireAuth>} />
                <Route path='/addRole' element={<AddRole />} />
                <Route path='/addRole/:id' element={<RequireAuth loginPath={"/login"}><AddRole /></RequireAuth>} />
                <Route path='/users' element={<RequireAuth loginPath={"/login"}><Users /></RequireAuth>} />
                <Route path='/addUser' element={<RequireAuth loginPath={"/login"}><AddUser /></RequireAuth>} />
                <Route path='/addUser/:id' element={<RequireAuth loginPath={"/login"}><AddUser /></RequireAuth>} />
                <Route path='/login' element={<Login />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>

    )
}
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
>
    <HashRouter><App /></HashRouter>
</AuthProvider>
);
