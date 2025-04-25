// ======================== Renter Dashboard Component ========================

import React from 'react';
import { motion } from 'framer-motion';

const user = {
  name: 'Hoor Ahmed',
  email: 'hoor@example.com',
  rentalsCount: 3,
  pendingRequests: 1,
};

const rentals = [
  {
    id: 1,
    image: '/src/assets/car1.jpg',
    title: 'Luxury Sedan - BMW 530i',
    price: '$75/day',
    date: '20 Apr - 30 Apr',
    status: 'Completed',
  },
  {
    id: 2,
    image: '/src/assets/car3.jpg',
    title: 'Off-road Adventure - Jeep Wrangler',
    price: '$90/day',
    date: '1 May - 10 May',
    status: 'Ongoing',
  },
];

const feedbacks = [
  {
    car: 'BMW 530i',
    rating: 5,
    text: 'The car was super comfortable and clean. Loved the experience!',
    date: '30 Apr 2025',
  },
  {
    car: 'Jeep Wrangler',
    rating: 4,
    text: 'Great for off-road but the fuel consumption was high.',
    date: '10 May 2025',
  },
];

const RenterDashboard = () => {
  return (
    <div className="min-h-screen px-6 py-16 lg:px-32 bg-[#f4f4f4]">
      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold text-[#2D2541] mb-2">Welcome, {user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <div className="flex gap-6 mt-4 text-sm text-gray-700">
          <span>📦 Rentals: {user.rentalsCount}</span>
          <span>⏳ Pending Requests: {user.pendingRequests}</span>
        </div>
      </motion.div>

      {/* My Rentals */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#2D2541]">My Rentals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white shadow-md rounded-xl p-4">
              <img src={rental.image} alt={rental.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <h4 className="font-bold text-[#2D2541] text-lg mb-1">{rental.title}</h4>
              <p className="text-sm text-gray-600">{rental.price} | {rental.date}</p>
              <p className={`text-sm mt-1 ${rental.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{rental.status}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* My Feedbacks */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#2D2541]">My Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.map((fb, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold text-[#2D2541] mb-1">{fb.car}</h4>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(fb.rating)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-sm text-gray-700 italic mb-2">“{fb.text}”</p>
              <p className="text-xs text-gray-400">{fb.date}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RenterDashboard;
