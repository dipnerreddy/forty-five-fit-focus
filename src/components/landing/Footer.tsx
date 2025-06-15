import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-black">45-Day Challenge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your life through the power of consistency. One day at a time, one rep at a time.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with dedication for serious challengers</span>
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Start Challenge
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Continue Journey
                </Link>
              </li>
              <li>
                <button
                  onClick={handleScroll('features')}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={handleScroll('testimonials')}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Get in Touch</h4>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <span>contact@dipnerreddy.in</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Questions about the challenge? Need technical support? We're here to help you succeed.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {currentYear} 45-Day Challenge. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-gray-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
