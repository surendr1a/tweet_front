// Navbar.jsx
import React from "react";
import { Sparkles, Star, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tweet2Pic
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-indigo-600 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-indigo-600 transition">
              Pricing
            </a>
            <a href="#templates" className="hover:text-indigo-600 transition">
              Templates
            </a>
            <a href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg shadow hover:shadow-lg hover:scale-105 transform transition"
            >
              <Star className="w-4 h-4 mr-2" />
              Get Started
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
