import React, { useState } from "react";
import { 
  User, Mail, Lock, UserCog, Sparkles, Eye, EyeOff, 
  CheckCircle, AlertCircle, GraduationCap, Calendar,
  ArrowRight, Shield
} from 'lucide-react';
import api from "../services/api";

const Register = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      calculatePasswordStrength(e.target.value);
    }
    if (error) setError("");
    if (success) setSuccess("");
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/) || password.match(/[$@#&!]+/)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-gradient-to-r from-red-500 to-red-400";
    if (passwordStrength <= 50) return "bg-gradient-to-r from-orange-500 to-orange-400";
    if (passwordStrength <= 75) return "bg-gradient-to-r from-yellow-500 to-yellow-400";
    return "bg-gradient-to-r from-emerald-500 to-teal-400";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthIcon = () => {
    if (passwordStrength === 100) return "🛡️";
    if (passwordStrength >= 75) return "👍";
    if (passwordStrength >= 50) return "👌";
    return "⚠️";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      setSuccess("Registration successful! Please log in.");
      setForm({ name: "", email: "", password: "", role: "student" });
      setPasswordStrength(0);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main card with glass effect */}
      <div className="relative w-full max-w-md">
        {/* Decorative top bar */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header with animated gradient text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Join SmartBreak
            </h2>
            <p className="text-gray-300 mt-2">Start your journey with us today</p>
          </div>

         

          {/* Error/Success messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm animate-shake">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm animate-bounce-in">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-200 text-sm">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field with floating label effect */}
            <div className="relative">
              <div className={`absolute left-4 transition-all duration-200 ${
                focusedField === 'name' || form.name 
                  ? '-top-2 text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-2' 
                  : 'top-3 text-gray-400'
              }`}>
                
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-indigo-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-14 pr-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-0 transition-all duration-200"
                  placeholder="John Doe"
                  required
                />
                <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                  focusedField === 'name' ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur"></div>
                </div>
              </div>
            </div>

            {/* Email field */}
            <div className="relative">
              <div className={`absolute left-4 transition-all duration-200 ${
                focusedField === 'email' || form.email 
                  ? '-top-2 text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-2' 
                  : 'top-3 text-gray-400'
              }`}>
              
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-indigo-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-14 pr-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-0 transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field with strength meter */}
            <div className="relative">
              <div className={`absolute left-4 transition-all duration-200 ${
                focusedField === 'password' || form.password 
                  ? '-top-2 text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-2' 
                  : 'top-3 text-gray-400'
              }`}>
                
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-indigo-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-14 pr-12 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-0 transition-all duration-200"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-indigo-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-indigo-400 transition-colors" />
                  )}
                </button>
              </div>
              
              {/* Password strength meter */}
              {form.password && (
                <div className="mt-3 space-y-2 animate-slide-down">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex space-x-1 h-2">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-all duration-500 ${
                            passwordStrength >= level * 25 
                              ? getStrengthColor() 
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-300 flex items-center space-x-1">
                      <span>{getStrengthIcon()}</span>
                      <span className={passwordStrength >= 75 ? 'text-emerald-400' : 'text-gray-400'}>
                        {getStrengthText()}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Use 8+ characters with uppercase, lowercase & numbers</span>
                  </p>
                </div>
              )}
            </div>

            {/* Role selection with cards */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Join as</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    value: "student", 
                    label: "Student", 
                    icon: User,
                    description: "Join events & learn",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  { 
                    value: "organizer", 
                    label: "Organizer", 
                    icon: UserCog,
                    description: "Create & manage events",
                    gradient: "from-purple-500 to-pink-500"
                  }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: option.value })}
                    className={`relative group overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 ${
                      form.role === option.value
                        ? `border-transparent bg-gradient-to-br ${option.gradient}`
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <option.icon className={`w-6 h-6 mb-2 ${
                        form.role === option.value ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                      }`} />
                      <span className={`text-sm font-semibold ${
                        form.role === option.value ? 'text-white' : 'text-gray-300'
                      }`}>
                        {option.label}
                      </span>
                      <span className={`text-xs mt-1 ${
                        form.role === option.value ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {option.description}
                      </span>
                    </div>
                    {form.role === option.value && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                  agreeTerms 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent' 
                    : 'border-white/20 group-hover:border-white/40'
                }`}>
                  {agreeTerms && (
                    <CheckCircle className="w-4 h-4 text-white absolute -top-0.5 -left-0.5" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/30">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/30">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !agreeTerms}
              className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center px-6 py-3 bg-gray-900 rounded-[10px] group-hover:bg-opacity-90 transition-all duration-300">
                {loading ? (
                  <span className="flex items-center justify-center text-white">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-white font-semibold">
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </div>
            </button>

            {/* Login link */}
            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-semibold hover:from-indigo-300 hover:to-purple-300 transition-all duration-200"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-sm text-gray-500">
          © 2024 SmartBreak. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
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

export default Register;