// ======================== Footer Component (Pro Version) ========================

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About Section */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">CarRental</h1>
          <p className="text-sm">Empowering mobility with trusted peer-to-peer car rentals across the region.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold mb-2">Quick Links</h2>
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/About" className="hover:text-white transition">About</Link>
          <Link to="/Cars" className="hover:text-white transition">Cars</Link>
     
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold mb-2">Contact Us</h2>
          <p>Email: support@carrental.com</p>
          <p>Phone: +201143368912</p>
          <p>Hours: 24/7 Support</p>
        </div>

        {/* Socials + Payments */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-white font-semibold mb-2">Follow Us</h2>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-white transition"><FaFacebook /></a>
              <a href="#" className="hover:text-white transition"><FaInstagram /></a>
              <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            </div>
          </div>
        
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 mt-12 border-t pt-6">
        © {new Date().getFullYear()} CarShare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
