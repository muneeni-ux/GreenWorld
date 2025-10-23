import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 text-white py-10 px-6 rounded-t-3xl shadow-inner mt-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* About */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold mb-3 text-yellow-400">
            Green World Mwingi Branch
          </h2>
          <p className="text-white/80 text-sm leading-relaxed italic">
            Empowering health through natural wellness.  
            Manage products, distributors, and sales — efficiently and smartly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold mb-3 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/home" className="hover:text-yellow-300 hover:underline transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/stock" className="hover:text-yellow-300 hover:underline transition">
                Stock
              </Link>
            </li>
            <li>
              <Link to="/sales" className="hover:text-yellow-300 hover:underline transition">
                Sales
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold mb-3 text-yellow-400">Connect With Us</h3>
          <div className="flex justify-center sm:justify-start gap-5 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:greenworldmwingi@example.com" className="hover:text-yellow-300 transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 my-6"></div>

      {/* Logo */}
      <div className="text-center">
        <img
          src="./greenworld1.jpg"
          alt="Green World Logo"
          className="w-20 h-20 mx-auto rounded-full shadow-md border border-white/20"
        />
      </div>

      <div className="mt-4 text-center text-xs text-white/60 italic">
        © {new Date().getFullYear()} Green World Stock & Sales System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
