// ======================== Styled Register Page ========================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone,FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { MdLocationPin } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', address: '', role: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', formData);
    navigate('/');
  };

  return (
    <div className="h-[130vh] flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute top-[-120px] left-[-100px] w-96 h-96 bg-black opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-[-80px] right-[-120px] w-80 h-80 bg-black opacity-30 rounded-full z-0"></div>
      {/* Gray Circles near Form */}
      <div className="absolute top-[20%] right-[25%] w-24 h-24 bg-gray-300 opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-[30%] right-[20%] w-32 h-32 bg-gray-400 opacity-10 rounded-full z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 relative z-20 min-h-[750px]"
      >
        {/* Left Welcome Section */}
        <div className="bg-gradient-to-b from-[#606060] to-[#424242] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          {/* Multiple Circles inside Welcome Section */}
          <div className="absolute w-24 h-24 bg-white opacity-20 rounded-full top-10 left-10"></div>
          <div className="absolute w-16 h-16 bg-white opacity-30 rounded-full top-24 left-20"></div>
          <div className="absolute w-20 h-20 bg-white opacity-15 rounded-full top-36 left-8"></div>
      

          <h2 className="text-4xl font-bold mb-4 z-10 relative">CREATE ACCOUNT</h2>
          <p className="text-sm max-w-md leading-relaxed z-10 relative">
            Join CarShare today. Create your account and start your car rental journey easily.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="p-10 flex flex-col justify-center relative z-10">
          {/* Circles inside Sign up section */}
          <div className="absolute w-20 h-20 bg-gray-300 opacity-10 rounded-full top-10 right-10"></div>
          <div className="absolute w-16 h-16 bg-gray-400 opacity-15 rounded-full bottom-10 right-20"></div>

          <h2 className="text-2xl font-bold text-[#333333] mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" username"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone "
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <MdLocationPin className="text-gray-400 mr-2" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="flex-1 outline-none text-sm"
                required
              />
            </div>
            {/* Role Selection */}
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
            required
          >
           
            <option value="">Choose Role</option>
            <option value="Renter">Renter</option>
            <option value="CarOwner">CarOwner</option>
          </select>
            <button
              type="submit"
              className="bg-[#333333] text-white py-2 rounded-md hover:bg-[#1f1f1f] transition"
            >
             Register
            </button>
            <div className="flex flex-col gap-3 mt-4">
              <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                <FcGoogle size={20} /> Sign up with Google
              </button>
              <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                <FaFacebookF size={18} className="text-blue-600" /> Sign up with Facebook
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center mt-6">
              <span>Already have an account?</span>
              <span onClick={() => navigate('/Login')} className="text-[#333333] font-semibold cursor-pointer">Log In</span>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
