import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Mail, Lock, LogIn, Eye, EyeOff,
    Shield, Key, User, ArrowRight
} from 'lucide-react';
import api from "../services/api";

const Login = ({ onSwitch, onLogin }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await api.post("/auth/login", {
                email: form.email,
                password: form.password,
            });
            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                // Fetch user profile and update context
                const meRes = await api.get("/auth/me");
                setUser(meRes.data);
                // Redirect based on role
                if (meRes.data.role === "organizer") {
                    navigate("/organizer/dashboard");
                } else {
                    navigate("/student/dashboard");
                }
            } else {
                setError("Unexpected response from server");
                setLoading(false);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
            {/* Animated background with floating orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-0 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>      </div>

            {/* Main card with premium glass effect */}
            <div className="relative w-full max-w-md">
                {/* Decorative top accent */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>

                <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-500"></div>

                    <div className="relative p-8">
                        {/* Header with animated icon */}
                        <div className="text-center mb-8">
                            <div className="relative inline-flex">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/30 transform hover:scale-110 hover:rotate-3 transition-all duration-300 flex items-center justify-center">
                                    <LogIn className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                                    Welcome Back
                                </span>
                            </h2>
                            <p className="text-gray-400">Sign in to continue your journey</p>
                        </div>

                       
                        {/* Divider with text */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-gray-400">or continue with email</span>
                            </div>
                        </div>

                        {/* Error message with animation */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm animate-shake">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                            <Key className="w-4 h-4 text-red-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-red-200 text-sm font-medium">Authentication Failed</p>
                                        <p className="text-red-300 text-xs mt-0.5">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email field with floating label */}
                            <div className="relative mb-4">
                                <label className={`absolute left-4 transition-all duration-200 z-10 ${focusedField === 'email' || form.email
                                        ? '-top-3 text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-2'
                                        : 'top-3 text-gray-400'
                                    }`}>
                                    
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <Mail className={`h-5 w-5 transition-all duration-200 ${focusedField === 'email' ? 'text-indigo-400 scale-110' : 'text-gray-500'
                                            }`} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-0 focus:bg-white/10 transition-all duration-200"
                                        placeholder="john@example.com"
                                        required
                                    />
                                    {/* Focus glow effect */}
                                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Password field with floating label */}
                            <div className="relative mb-4">
                                <label className={`absolute left-4 transition-all duration-200 z-10 ${focusedField === 'password' || form.password
                                        ? '-top-3 text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-2'
                                        : 'top-3 text-gray-400'
                                    }`}>
                                    
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <Lock className={`h-5 w-5 transition-all duration-200 ${focusedField === 'password' ? 'text-indigo-400 scale-110' : 'text-gray-500'
                                            }`} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-12 pr-12 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-0 focus:bg-white/10 transition-all duration-200"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-indigo-400 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-indigo-400 transition-colors" />
                                        )}
                                    </button>

                                    {/* Focus glow effect */}
                                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Remember me & Forgot password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${rememberMe
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent'
                                                : 'border-white/20 group-hover:border-white/40'
                                            }`}>
                                            {rememberMe && (
                                                <svg className="w-4 h-4 text-white absolute -top-0.5 -left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Remember me
                                    </span>
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text hover:from-indigo-300 hover:to-purple-300 transition-all duration-200 font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Security notice */}
                            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-white/5 p-2 rounded-lg">
                                <Shield className="w-3 h-3 text-indigo-400" />
                                <span>Your information is protected with 256-bit encryption</span>
                            </div>

                            {/* Submit button with premium effect */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="relative flex items-center justify-center px-6 py-3.5 bg-gray-900 rounded-[10px] group-hover:bg-opacity-90 transition-all duration-300">
                                    {loading ? (
                                        <span className="flex items-center justify-center text-white font-semibold">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Authenticating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center text-white font-semibold">
                                            Sign In
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    )}
                                </div>
                            </button>
                        </form>

                        {/* Register link with animation */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    onClick={onSwitch}
                                    className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-semibold hover:from-indigo-300 hover:to-purple-300 transition-all duration-200 relative group"
                                >
                                    Create account
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            </p>
                        </div>

                        {/* ...removed demo credentials card... */}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-sm text-gray-500">
                    © 2024 SmartBreak. Secure login • Version 2.0
                </p>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default Login;