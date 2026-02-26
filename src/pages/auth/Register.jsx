import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "./supabase_client";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        setMessage("");

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,

            // THIS IS IMPORTANT — saves name
            options: {
                data: {
                    name: form.name,
                    redirectTo: 'https://vite-react-taskmanger.vercel.app/',
                },
            },
        });

        setLoading(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        // If email confirmation enabled
        if (!data.session) {
            alert("Check your email to confirm registration.");
            navigate("/");
        } else {
            // If email confirmation disabled → auto login
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">

                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    Create Account
                </h2>

                <p className="text-gray-500 text-center text-sm mb-6">
                    Register to access your dashboard
                </p>

                <form onSubmit={handleSignup} className="space-y-6">

                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type="text"
                            required
                            value={form.name}
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type="email"
                            required
                            value={form.email}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={form.password}
                            placeholder="Create password"
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type={showConfirm ? "text" : "password"}
                            required
                            value={form.confirmPassword}
                            placeholder="Confirm password"
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none"
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>

                    {/* Message */}
                    {message && (
                        <p className="text-red-500 text-sm text-center">{message}</p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg font-semibold text-white 
                        bg-[var(--primary-color)] hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    {/* Login */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}