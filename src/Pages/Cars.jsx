// ======================== Cars Page ========================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cars = [
  {
    id: 1,
    image: 'src/assets/BMW-MY24-5Series-Core-DP-MakeItYours-Mobile.avif',
    owner: 'Sarah A.',
    title: 'Luxury Sedan',
    description: 'Spacious and comfortable, perfect for family trips.',
    type: 'Sedan',
    brand: 'BMW',
    model: '530i',
    year: 2022,
    transmission: 'Automatic',
    location: 'Cairo',
    status: 'Available',
    availability: '20 Apr - 30 Apr',
    price: '$75/day',
  },
  {
    id: 2,
    image: '/src/assets/car2.jpg',
    owner: 'Omar K.',
    title: 'Urban Hatchback',
    description: 'Compact and efficient for city use.',
    type: 'Hatchback',
    brand: 'Toyota',
    model: 'Yaris',
    year: 2021,
    transmission: 'Manual',
    location: 'Alexandria',
    status: 'Rented',
    availability: '5 May - 15 May',
    price: '$45/day',
  },
  {
    id: 3,
    image: '/src/assets/car3.jpg',
    owner: 'Lina M.',
    title: 'Off-road Adventure',
    description: 'Perfect for off-road fun and tough roads.',
    type: '4x4',
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    transmission: 'Automatic',
    location: 'Giza',
    status: 'Available',
    availability: '1 May - 10 May',
    price: '$90/day',
  },
];

const Cars = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);

  const handleRentClick = () => {
    navigate('/login');
  };

  const filteredCars = cars.filter((car) => {
    const matchesType = selectedType === 'All' || car.type === selectedType;
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const numericPrice = parseInt(car.price.replace('$', '').replace('/day', ''));
    const matchesPrice = numericPrice <= parseInt(maxPrice);
    return matchesType && matchesBrand && matchesPrice;
  });

  const uniqueBrands = [...new Set(cars.map(car => car.brand))];

  return (
    <div className="bg-[#f4f4f4] min-h-screen px-6 py-16 lg:px-32">
      <h2 className="text-3xl font-bold text-[#2D2541] mb-6 text-left">Available Cars</h2>

      {/* Car Type Filter Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {['All', 'SUV', 'Sedan', '4x4', 'Hatchback'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${selectedType === type ? 'bg-[#2D2541] text-white' : 'bg-white text-[#2D2541] border-[#2D2541] hover:bg-[#e6e6e6]'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Brand and Price Filters */}
      <div className="flex gap-4 mb-10 flex-wrap items-center">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D2541]"
        >
          <option value="All">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <div className="flex flex-col">
          <label htmlFor="priceRange" className="text-sm text-gray-700 mb-1">Max Price: ${maxPrice}</label>
          <input
            id="priceRange"
            type="range"
            min="20"
            max="200"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2D2541]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCars.map((car) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
          >
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#2D2541] mb-1">{car.title}</h3>
            <p className="text-gray-500 text-sm mb-2">by {car.owner}</p>
            <p className="text-sm text-gray-700 mb-4">{car.description}</p>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Type:</strong> {car.type} | <strong>Brand:</strong> {car.brand} {car.model}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Year:</strong> {car.year} | <strong>Transmission:</strong> {car.transmission}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Location:</strong> {car.location}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong>{' '}
              <span className={car.status === 'Available' ? 'text-green-500' : 'text-red-500'}>{car.status}</span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Available:</strong> {car.availability}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-[#2D2541]">{car.price}</span>
              <button
                onClick={handleRentClick}
                className="bg-black text-white px-4 py-1 text-sm rounded-md hover:bg-[#2D2541] transition duration-300"
              >
                Rent Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
