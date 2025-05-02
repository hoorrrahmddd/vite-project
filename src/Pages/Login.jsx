import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7037/api/User/login', formData);
      console.log('Login Response:', response.data);
      if (!response.data.token) {
        alert(response.data.message || 'Login failed.'); 
        return;
      }

      // Save token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken); 
      
      // Decode JWT to get role
      const decoded = jwtDecode(response.data.token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      localStorage.setItem("role", role);
     
      // Navigate based on role
      if (role === 'Admin') {
        navigate('/AdminDashboard');
      } else if (role === 'CarOwner') {
        navigate('/CarOwnerDashboard');
      } else {
        navigate('/RenterDashboard');
      }

    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed, please check your credentials.');
    }
  };

  return (
    <div className="h-[120vh] flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-120px] left-[-100px] w-96 h-96 bg-black opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-[-80px] right-[-120px] w-80 h-80 bg-black opacity-30 rounded-full z-0"></div>
      <div className="absolute top-[20%] right-[25%] w-24 h-24 bg-gray-300 opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-[30%] right-[20%] w-32 h-32 bg-gray-400 opacity-10 rounded-full z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 relative z-20 min-h-[700px]"
      >
        {/* Left Welcome Section */}
        <div className="bg-gradient-to-b from-[#6f6f6f] to-[#4e4e4e] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <h2 className="text-4xl font-bold mb-4 z-10 relative">WELCOME</h2>
          <p className="text-sm max-w-md leading-relaxed z-10 relative">
            Welcome back to CarShare. Log in to continue exploring flexible and secure car rentals.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="p-10 flex flex-col justify-center relative z-10">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
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
            <button
              type="submit"
              className="bg-[#333333] text-white py-2 rounded-md hover:bg-[#1f1f1f] transition"
            >
              Log in
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center mt-6">
              <span>Don't have an account?</span>
              <span
                onClick={() => navigate('/Register')}
                className="text-[#333333] font-semibold cursor-pointer"
              >
                Register
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
