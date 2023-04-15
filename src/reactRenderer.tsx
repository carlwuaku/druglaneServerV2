import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css'
import '@/style.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Activate from "./app/pages/activate";
import Index from "./app/pages";
import NotFound from "./app/pages/notFound";

export default function App() {
    return (
        <div>
            <Routes>
                
                <Route path='/activate' element={<Activate />} />
                <Route path='/help' element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);
// ReactDOM.render(<BrowserRouter><App /></BrowserRouter> , document.getElementById('root'));