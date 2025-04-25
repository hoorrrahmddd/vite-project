// ======================== Signup Component ========================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' , phone: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User registered:', formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] px-4 relative overflow-hidden">
      {/* Decorative Background Circles with gray tones */}
      <div className="absolute top-[-80px] left-[-150px] z-0">
        <div className="w-60 h-60 bg-[#2d2d2d] opacity-20 rounded-full"></div>
      </div>
      <div className="absolute bottom-[-60px] left-[-100px] z-0">
        <div className="w-36 h-36 bg-[#1f1f1f] opacity-15 rounded-full"></div>
      </div>
      <div className="absolute top-[30%] left-[-80px] z-0">
        <div className="w-24 h-24 bg-[#111111] opacity-15 rounded-full"></div>
      </div>
      <div className="absolute bottom-[5%] left-[10%] z-0">
        <div className="w-32 h-32 bg-[#000000] opacity-10 rounded-full"></div>
      </div>
      <div className="absolute bottom-[-60px] right-[-80px] z-0">
        <div className="w-44 h-44 bg-[#1a1a1a] opacity-10 rounded-full"></div>
      </div>
      <div className="absolute top-[20%] right-[-40px] z-0">
        <div className="w-24 h-24 bg-[#3b3b3b] opacity-15 rounded-full"></div>
      </div>
      <div className="absolute bottom-[10%] left-[20%] z-0">
        <div className="w-16 h-16 bg-[#4a4a4a] opacity-10 rounded-full"></div>
      </div>
      <div className="absolute top-[30%] left-[60%] z-0">
        <div className="w-32 h-32 bg-[#1e1e1e] opacity-12 rounded-full"></div>
      </div>
      <div className="absolute top-[10%] right-[30%] z-0">
        <div className="w-20 h-20 bg-[#5a5a5a] opacity-10 rounded-full"></div>
      </div>
      <div className="absolute bottom-[20%] right-[10%] z-0">
        <div className="w-28 h-28 bg-[#000000] opacity-10 rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#2D2541]">Create an Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
            required
          />
            <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="phone"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
            required
          />
          <button
            type="submit"
            className="bg-[#2D2541] text-white py-2 rounded-md hover:bg-[#413364] transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account? <span className="text-[#2D2541] cursor-pointer" onClick={() => navigate('/Login')}>Log In</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;