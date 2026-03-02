
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Calendar, Users, Zap, ArrowRight, Github, Twitter } from 'lucide-react';
import Login from "./Login";

const Landing = () => {
  const { user, logout } = useAuth();
  // Auth modal logic removed; now using /login page

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>



      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white mb-8 border border-white/20">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm">Revolutionizing Student Events</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Organize & Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Student Events Smarter
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of students organizing and discovering amazing events. 
            From study groups to parties, find your next adventure with SmartBreak.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {!user && (
              <a
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </a>
            )}
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-xl text-white font-semibold hover:bg-white/20 transition border border-white/20">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Active Students", icon: Users },
              { number: "500+", label: "Events Monthly", icon: Calendar },
              { number: "50+", label: "Universities", icon: Sparkles },
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-32">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Everything you need to
            <span className="block text-indigo-400">manage events seamlessly</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8 text-indigo-400" />,
                title: "Smart Scheduling",
                description: "AI-powered scheduling that finds the perfect time for everyone"
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                title: "Community Driven",
                description: "Connect with like-minded students and build your network"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-pink-400" />,
                title: "Discover Events",
                description: "Personalized event recommendations based on your interests"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl p-12 text-center border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to make your breaks smarter?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the community and start discovering amazing events today.
          </p>
          {!user && (
            <a
              href="/login"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Sign in
            </a>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <span className="text-white font-semibold">SmartBreak</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 SmartBreak. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
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

export default Landing;