import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { startConnection, onNotificationReceived } from '../signalr/notificationHub';


const Cars = () => {
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);

  const navigate = useNavigate();

  const handleRentClick = (carId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in as a Renter to rent a car.");
      navigate("/login");
      return;
    }

    navigate(`/apply-rent/${carId}`);
  };

  useEffect(() => {
    // 🟢 Start SignalR Connection
    startConnection();

    // 🟡 Listen for real-time notification
    onNotificationReceived((message) => {
      alert("🚗 New Car Post: " + message);
      window.location.reload();
    });

    fetch("https://localhost:7037/api/car")
      .then(res => res.json())
      .then(async data => {
        const uniqueCars = data.filter(
          (car, index, self) =>
            car && car.id && self.findIndex(c => c.id === car.id) === index
        );

        const carsWithFeedbacks = await Promise.all(
          uniqueCars.map(async (car) => {
            try {
              const res = await fetch(`https://localhost:7037/api/Feedback/car/${car.id}`);
              const feedbacks = await res.json();
              return { ...car, feedbacks };
            } catch {
              return { ...car, feedbacks: [] };
            }
          })
        );

        setCars(carsWithFeedbacks);
      })
      .catch(err => console.error("Error loading cars:", err));
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
          {uniqueBrands.map((brand, index) => (
            <option key={`${brand}-${index}`} value={brand}>
              {brand}
            </option>
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
              src={`https://localhost:7037/${car.imagePath}`}
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
            <div className="text-sm text-gray-600 mb-4">
              <strong>Available:</strong> {car.availableFrom?.split("T")[0]} - {car.availableTo?.split("T")[0]}
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#2D2541]">${car.rentalPrice}/day</span>
              <button
                onClick={() => handleRentClick(car.id)}
                className="bg-black text-white px-4 py-1 text-sm rounded-md hover:bg-[#2D2541] transition duration-300"
              >
                Rent Now
              </button>
            </div>

            {car.feedbacks && car.feedbacks.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-[#2D2541] mb-1">User Feedback:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {car.feedbacks.map((fb, index) => (
                    <div key={index} className="border-t pt-2 text-sm text-gray-700">
                      <p>⭐ {fb.rating} / 5</p>
                      <p className="italic">"{fb.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
