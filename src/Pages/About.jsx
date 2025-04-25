// ======================== About Component ========================

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-[100vh] py-20 px-10 lg:px-32 text-gray-800">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold">About CarShare</h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
          Making car rental easier, faster, and more personal for everyone.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f4f4f4] p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-sm text-gray-700">
            We aim to empower people to move freely and affordably by connecting trusted car owners with responsible renters through a seamless, user-friendly digital experience.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f4f4f4] p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-sm text-gray-700">
            To become the leading peer-to-peer car rental platform across the region, redefining mobility and creating economic opportunities through smart car sharing.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose CarShare?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Verified Car Owners", "Real-time Availability", "Transparent Pricing", "Fast Booking Process", "Secure Payments", "Trusted Community"].map((point, index) => (
            <div key={index} className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-700 text-center">{point}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 text-sm mb-4">Want to join the journey?</p>
        <button
          onClick={() => navigate('/Signup')}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Join Us Now
        </button>
      </motion.div>
    </div>
  );
};

export default About;
