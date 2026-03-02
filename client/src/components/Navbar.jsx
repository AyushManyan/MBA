import React from "react";
import { Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          <span className="text-2xl font-bold text-white">SmartBreak</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-300 hover:text-white transition">Features</Link>
          <Link to="/how-it-works" className="text-gray-300 hover:text-white transition">How it works</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <a
              href={user.role === "organizer" ? "/organizer/dashboard" : "/student/dashboard"}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white hover:from-indigo-600 hover:to-purple-600 transition border border-white/20 font-semibold"
            >
              {user.role === "organizer" ? "Organizer Dashboard" : "Student Dashboard"}
            </a>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 border border-white/20 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white hover:bg-white/20 transition border border-white/20"
          >
            Sign in
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
