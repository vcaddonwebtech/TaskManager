import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "./supabase_client";


export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async(e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        // if (user?.email === form.email && user?.password === form.password)
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
        if (error) {
            // if (remember) {
            //     localStorage.setItem("rememberedUser", JSON.stringify(form));
            // }
            alert("Login Successfull")
            navigate("/dashboard");
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Login
                </h2>
                <p className="text-gray-500 text-center text-sm mb-8">
                    Access your company dashboard
                </p>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email Input */}
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        {/* Eye Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end -mt-4">
                        <button
                            type="button"
                            className="text-sm cursor-pointer text-purple-600 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2 -mt-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="w-4 h-4 accent-purple-600 cursor-pointer"
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-600 cursor-pointer"
                        >
                            Remember me
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg font-semibold text-white 
                        bg-[var(--primary-color)] hover:opacity-90
                        shadow-md hover:shadow-lg
                        transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
