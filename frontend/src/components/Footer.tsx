import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#2e7d32]">SB</span>
              </div>
              <span className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                SkillBridge
              </span>
            </div>
            <p className="text-[#e8f5e9] text-sm">
              Connecting volunteers with NGOs to create meaningful impact. Bridge your skills with opportunities that matter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-[#e8f5e9] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#e8f5e9] hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-[#e8f5e9] hover:text-white transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#e8f5e9] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h3 className="mb-4">For Organizations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-[#e8f5e9] hover:text-white transition-colors">
                  Register as NGO
                </Link>
              </li>
              <li>
                <Link to="/ngo-dashboard" className="text-[#e8f5e9] hover:text-white transition-colors">
                  NGO Dashboard
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-[#e8f5e9] hover:text-white transition-colors">
                  Post Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-[#e8f5e9]" />
                <a href="mailto:info@skillbridge.org" className="text-[#e8f5e9] hover:text-white">
                  info@skillbridge.org
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-[#e8f5e9]" />
                <a href="tel:+1234567890" className="text-[#e8f5e9] hover:text-white">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-[#e8f5e9] mt-1" />
                <span className="text-[#e8f5e9]">
                  123 Impact Street, City, Country
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#e8f5e9] hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#e8f5e9] hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#e8f5e9] hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-[#e8f5e9] hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4caf50] mt-8 pt-8 text-center text-sm text-[#e8f5e9]">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved. Built with ❤️ for social impact.</p>
        </div>
      </div>
    </footer>
  );
};
