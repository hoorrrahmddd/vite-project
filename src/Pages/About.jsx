import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] px-6 py-20 lg:px-32 flex flex-col gap-20">

      {/* الجزء الأول - الصور والعبارة */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="flex flex-col md:flex-row gap-10 items-center"
      >
        {/* الديف الثاني - عبارة */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-[#2D2541] mb-6">Discover Freedom with CarShare</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            CarShare is more than just a platform — it's your gateway to smart, flexible, and affordable travel. 
            Whether you're an owner or a renter, we bring the community together for better mobility.
          </p>
        </div>

        {/* الديف الأول - صور */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div className="flex flex-row gap-6">
            <img src="src/assets/pexels-photo-305070.webp" alt="Car 1" className="w-1/2 h-48 object-cover rounded-lg shadow-md" />
            <img src="src/assets/pexels-photo-28926633.webp" alt="Car 2" className="w-1/2 h-48 object-cover rounded-lg shadow-md" />
          </div>
          <div>
            <img src="src/assets/pexels-photo-4038045.webp" alt="Car 3" className="w-full h-56 object-cover rounded-lg shadow-md" />
          </div>
        </div>
      </motion.div>

      {/* الجزء الثاني - Commitment Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="flex flex-col md:flex-row items-center bg-white rounded-xl p-8 gap-10"
      >
        {/* صورة عالشمال */}
        <div className="w-full md:w-1/2">
          <img src="src/assets/Screenshot 2025-04-28 160432.png" alt="Handshake" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* نص عاليمين */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h2 className="text-3xl font-bold text-[#2D2541]">
            We don’t just meet your expectations, we exceed them.
          </h2>
          <p className="text-gray-600 text-base">
            We are committed to providing our customers with exceptional service and competitive pricing.
          </p>

          <ul className="text-gray-700 text-sm space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> 24 hours a day, 7 days a week customer support team
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Professional drivers with highly communication skills and safety standards
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> All our fleet latest models years 2020/2024
            </li>
          </ul>
        </div>
      </motion.div>

    </div>
  );
};

export default About;
