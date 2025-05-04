import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);

  const navigate = useNavigate();
  const handleRentClick = (carId) => {
    navigate(`/apply-rent/${carId}`);
  };
  
  useEffect(() => {
    const fakeCars = [
      {
        id: 1,
        title: 'Toyota Corolla',
        description: 'Reliable sedan, great for city drives.',
        carType: 'Sedan',
        brand: 'Toyota',
        model: 'Corolla',
        year: '2021',
        transmission: 'Automatic',
        location: 'Cairo',
        rentalStatus: 'Available',
        availableFrom: '2025-05-01',
        availableTo: '2025-06-01',
        rentalPrice: '120',
        imagePath: 'src/assets/pexels-photo-305070.webp',
      },
      {
        id: 2,
        title: 'Jeep Wrangler',
        description: '4x4 SUV, perfect for desert adventures.',
        carType: '4x4',
        brand: 'Jeep',
        model: 'Wrangler',
        year: '2020',
        transmission: 'Manual',
        location: 'Alexandria',
        rentalStatus: 'Available',
        availableFrom: '2025-05-05',
        availableTo: '2025-06-10',
        rentalPrice: '180',
        imagePath: 'src/assets/تنزيل-removebg-preview.png',
      },
    ];
    setCars(fakeCars);
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesType = selectedType === 'All' || car.carType === selectedType;
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesPrice = parseFloat(car.rentalPrice) <= parseFloat(maxPrice);
    return matchesType && matchesBrand && matchesPrice;
  });

  const uniqueBrands = [...new Set(cars.map(car => car.brand))];

 

  return (
    <div className="bg-[#f4f4f4] min-h-screen px-6 py-16 lg:px-32">
      <h2 className="text-3xl font-bold text-[#2D2541] mb-6 text-left">Available Cars</h2>

      {/* Filters */}
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

      {/* Cars List */}
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
              src={car.imagePath}
              alt={car.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#2D2541] mb-1">{car.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{car.description}</p>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Type:</strong> {car.carType} | <strong>Brand:</strong> {car.brand} {car.model}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Year:</strong> {car.year} | <strong>Transmission:</strong> {car.transmission}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Location:</strong> {car.location}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong>{' '}
              <span className={car.rentalStatus === 'Available' ? 'text-green-500' : 'text-red-500'}>{car.rentalStatus}</span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Available:</strong> {car.availableFrom} - {car.availableTo}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-[#2D2541]">${car.rentalPrice}/day</span>
              <button
              onClick={() => handleRentClick(car.id)}
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
