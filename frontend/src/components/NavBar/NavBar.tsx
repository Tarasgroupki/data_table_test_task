import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="flex h-full">
            <nav className="bg-gray-800 w-64 min-h-screen p-4">
                <div className="text-white text-lg font-bold mb-6">Sidebar Panel</div>

                <NavLink
                    className="side-bar-link text-white block py-2 px-4 mb-4 rounded-lg hover:bg-gray-700"
                    to="/"
                >
                    Main
                </NavLink>

                <NavLink
                    className="side-bar-link text-white block py-2 px-4 mb-4 rounded-lg hover:bg-gray-700"
                    to="/admin"
                >
                    Settings
                </NavLink>

                <NavLink
                    className="side-bar-link text-white block py-2 px-4 mb-4 rounded-lg hover:bg-gray-700"
                    to="/data"
                >
                    Users Data
                </NavLink>
            </nav>
        </div>
    );
};

export default NavBar;