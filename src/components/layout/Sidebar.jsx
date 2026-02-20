import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    CheckSquare,
    FolderKanban,
    LogOut
} from "lucide-react";

import logo from "../../assets/logo.png";

export default function Sidebar({ isOpen }) {

    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Tasks", icon: CheckSquare, path: "/tasks" },
        { name: "Projects", icon: FolderKanban, path: "/projects" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("rememberedUser");
        navigate("/");
    };

    return (
        <aside
            className={`bg-(--bg-color) border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0 z-20 overflow-x-hidden
            ${isOpen ? "w-64" : "w-20"}`}
        >
            {/* 🔹 Logo Section */}
            <div
                className={`flex items-center h-16 border-b border-gray-200 shrink-0 transition-all duration-300 overflow-hidden
                ${isOpen ? "px-6 gap-3" : "justify-center px-0"}`}
            >
                <img
                    src={logo}
                    alt="Logo"
                    className="w-9 h-9 object-contain rounded-lg " 
                />

                {isOpen && (
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-400 transition duration-150 ease-in-out overflow-hidden"  >
                        Task Manager
                    </span>
                )}
            </div>

            {/* 🔹 Menu Section */}
            <div
                className={`flex-1 py-6 space-y-1.5 transition-all duration-300 overflow-x-hidden overflow-y-hidden
                ${isOpen ? "px-4" : "px-3"}`}
            >
                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2.5 rounded-xl transition-all duration-200 group relative
                                ${isOpen ? "px-4" : "justify-center px-0"}
                                ${
                                    isActive
                                        ? "bg-(--active-color) text-(--primary-color) shadow-lg font-medium"
                                        : "text-blue-300 hover:text-(--primary-color) "
                                }`
                            }
                        >
                            <Icon size={22} className="shrink-0" />

                            <span
                                className={`whitespace-nowrap transition-all duration-300 overflow-hidden
                                ${
                                    isOpen
                                        ? "w-auto opacity-100"
                                        : "w-0 opacity-0 pointer-events-none"
                                }`}
                            >
                                {item.name}
                            </span>

                            {/* Tooltip when collapsed */}
                            {!isOpen && (
                                <div className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    {item.name}
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* 🔹 Bottom Section */}
            <div
                className={`p-4 border-t border-gray-100 shrink-0 transition-all duration-300 
                ${isOpen ? "px-4" : "px-3"}`}
            >
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full py-2.5 rounded-xl text-gray-600 
                    hover:bg-red-50 hover:text-red-600 transition-all duration-200 group relative
                    ${isOpen ? "px-4" : "justify-center px-0"}`}
                >
                    <LogOut
                        size={22}
                        className="shrink-0 transition-transform group-hover:translate-x-1"
                    />

                    <span
                        className={`whitespace-nowrap transition-all duration-300 overflow-hidden
                        ${
                            isOpen
                                ? "w-auto opacity-100"
                                : "w-0 opacity-0 pointer-events-none"
                        }`}
                    >
                        Logout
                    </span>

                    {!isOpen && (
                        <div className="absolute left-full ml-6 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
