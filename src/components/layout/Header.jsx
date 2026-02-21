import { Menu, Bell, Sun, Moon, User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../pages/auth/supabase_client";

export default function Header({ toggleSidebar }) {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleLogout = async() => {
        // localStorage.removeItem("rememberedUser");
        await supabase.auth.signOut();
        navigate("/");
    };
 

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-(--bg-color) shadow-sm backdrop-blur-md h-16 flex items-center justify-between px-6 border-b border-gray-100 sticky top-0 z-10 transition-all duration-300">

            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-xl cursor-pointer text-gray-500 hover:bg-purple-50 hover:text-(--primary-color) transition-all duration-200"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>

                {/* Notification */}
                <button className="relative p-2.5 cursor-pointer rounded-xl text-blue-500 hover:bg-(--active-color) transition-all duration-200">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Dark Mode */}
                <button
                    onClick={handleThemeToggle}
                    className="p-2.5 rounded-xl text-(--primary-color) hover:bg-(--active-color) transition-all duration-200"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Profile Image */}
                <div className="relative ml-2">
                    <button
                        onClick={() => setOpen(!open)}
                        className={`group relative flex items-center gap-2 p-1 rounded-full border-2 transition-all duration-300 ${open ? "border-(--primary-color) ring-4 ring-purple-50" : "border-transparent hover:border-purple-200"
                            }`}
                    >
                        <div className="w-8 h-8 cursor-pointer rounded-full overflow-hidden shadow-sm">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="profile"
                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                            <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                <p className="text-sm font-semibold text-gray-800">{user?.name || "example"}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || "example@gmail.com"}</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/dashboard/profile");
                                    setOpen(false);
                                }}
                                className="flex items-center cursor-pointer gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-(--primary-color) w-full transition-all duration-200"
                            >
                                <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-white">
                                    <User size={16} />
                                </div>
                                <span className="font-medium">Profile</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center cursor-pointer gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-all duration-200 mt-1"
                            >
                                <div className="p-1.5 rounded-lg bg-red-50/50">
                                    <LogOut size={16} />
                                </div>
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
    console.log("Header rendered");
}
