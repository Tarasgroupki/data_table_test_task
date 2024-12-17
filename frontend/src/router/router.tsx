import React from "react"
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import { RegisterPage } from "../pages/Register";
import { AdminPage } from "../pages/Admin";
import { TablePage } from "../pages/Table";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/data" element={<TablePage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default Router;