
// ======================== Styled About Page ========================

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-20 lg:px-32 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-150px] w-72 h-72 bg-black opacity-10 rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] right-[-150px] w-80 h-80 bg-black opacity-10 rounded-full z-0"></div>

      <div className="relative z-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#2D2541] mb-4">About CarShare</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Redefining how you move. CarShare connects trusted car owners with responsible renters through a flexible and secure platform.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#f9f9f9] rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-[#2D2541] mb-4">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              Empowering mobility by providing accessible, flexible, and affordable car rental experiences to everyone.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#f9f9f9] rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-[#2D2541] mb-4">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              To be the leading peer-to-peer car rental platform, enabling smarter travel and creating economic opportunities.
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-[#2D2541] mb-8">Our Story</h3>
          <div className="text-center text-gray-600 max-w-3xl mx-auto text-sm">
            Since 2020, CarShare has been on a mission to revolutionize mobility. What started with a few cars and a big dream is now a trusted network connecting thousands of drivers and owners across the region.
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-[#2D2541] mb-8">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Trust', 'Transparency', 'Flexibility', 'Innovation', 'Security', 'Community'].map((value, index) => (
              <div key={index} className="bg-[#f4f4f4] rounded-2xl shadow p-6 text-center">
                <p className="text-[#2D2541] font-semibold text-lg mb-2">{value}</p>
                <p className="text-gray-600 text-sm">We believe in {value.toLowerCase()} as a cornerstone of every journey.</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 text-sm mb-4">Ready to be part of the future of mobility?</p>
          <button className="bg-[#2D2541] text-white px-6 py-2 rounded-md hover:bg-[#413364] transition duration-300">
            Join Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
