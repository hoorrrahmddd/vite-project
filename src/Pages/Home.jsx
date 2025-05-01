// ======================== Home Component ========================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaCarSide, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [currentReview, setCurrentReview] = useState(0);

  const users = [
    {
      name: "Hoor Ahmed",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "The process was seamless and the car was in great condition. Definitely using this again!",
    },
    {
      name: "Omar K.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Loved how easy it was to find a car and communicate with the owner. Super smooth experience.",
    },
    {
      name: "Lina M.",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      text: "Affordable prices and flexible options made my trip stress-free. Highly recommend it.",
    },
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % users.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + users.length) % users.length);
  };

  return (
    
    <div className="flex flex-col bg-[#f4f4f4] min-h-[100vh] relative overflow-hidden">
      {/* ===== Hero Section Background Circles ===== */}
      <div className="absolute top-[-100px] left-[-180px] z-0">
        <div className="w-72 h-72 bg-[#333333] rounded-full"></div>
      </div>
      <div className="absolute top-[60px] left-[-100px] z-0">
        <div className="w-12 h-12 bg-[#575757] rounded-full"></div>
      </div>
      <div className="absolute top-[5px] right-[-250px] z-0">
        <div className="w-64 md:w-80 lg:w-[650px] aspect-square bg-[#333333d0] rounded-full"></div>
      </div>

      {/* ===== Hero Section ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex items-center px-32 py-20"
      >
        <div className="w-full max-w-[600px] flex flex-col z-10 text-left">
          <h2 className="text-4xl font-bold text-[#333] mb-4">Drive the future, today</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Discover a smarter way to rent premium cars around the clock. Our platform gives you full control over the rental process with flexible options, clear pricing, and trusted car owners — anytime, anywhere.
          </p>
          <button
            onClick={() => navigate('/Cars')}
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-black hover:text-white border transition duration-300 w-fit"
          >
            Explore Cars
          </button>
        </div>
        <div className="w-1/2 flex justify-end items-center z-10">
          <img
            src="/src/assets/تنزيل-removebg-preview.png"
            alt="Car"
            className="w-full max-w-[800px] h-auto object-contain"
          />
        </div>
      </motion.div>

      {/* ===== CTA Section ===== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-black text-white text-center py-20 px-32"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-lg mb-6">Sign up now and explore a world of car rental possibilities.</p>
        <button
          onClick={() => navigate('/Cars')}
          className="bg-white text-black px-6 py-2 rounded-md hover:bg-[#f4f4f4] transition duration-300"
        >
          Explore Cars
        </button>
      </motion.section>

      {/* ===== How It Works Section ===== */}
      <section className="py-20 px-32 bg-white">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-500 mt-2 text-sm">3 simple steps to get you on the road</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: <FaUserPlus />,
            title: "Step 1: Sign Up",
            text: "Create your account in seconds with just an email and password."
          }, {
            icon: <FaCarSide />,
            title: "Step 2: Choose a Car",
            text: "Browse a wide range of cars and pick what suits your needs best."
          }, {
            icon: <GiSteeringWheel />,
            title: "Step 3: Drive & Enjoy",
            text: "Pick up your car, hit the road, and drive with peace of mind."
          }].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#f4f4f4] rounded-2xl shadow-md p-10 text-center hover:shadow-lg transition flex flex-col items-center justify-center gap-4"
            >
              <div className="text-4xl text-[#2D2541]">
                {card.icon}
              </div>
              <h4 className="text-xl font-semibold text-[#2D2541]">{card.title}</h4>
              <p className="text-sm text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Reviews Section - Carousel Style ===== */}
      <section className="py-24 px-32 bg-[#f9f9f9]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <p className="text-gray-500 mt-2 text-sm">Real feedback from real renters</p>
        </div>
        <div className="relative max-w-xl mx-auto">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-4 items-start text-left"
          >
            <div className="flex items-center gap-4">
              <img
                src={users[currentReview].image}
                alt={users[currentReview].name}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{users[currentReview].name}</p>
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, j) => <FaStar key={j} />)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic leading-relaxed">“{users[currentReview].text}”</p>
          </motion.div>
          <div className="flex justify-between mt-6 text-gray-500">
            <button onClick={prevReview} className="hover:text-black transition">
              <FaChevronLeft size={20} />
            </button>
            <button onClick={nextReview} className="hover:text-black transition">
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
