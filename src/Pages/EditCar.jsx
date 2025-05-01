import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    carType: '',
    brand: '',
    model: '',
    year: '',
    transmission: '',
    location: '',
    availableFrom: '',
    availableTo: '',
    rentalPrice: '',
    image: null,
  });

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`https://localhost:7037/api/CarOwner/MyCars`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const carsArray = res.data?.$values || [];
        const car = carsArray.find(c => c.id === parseInt(id));
        if (!car) {
          alert('Car not found');
          navigate('/CarOwnerDashboard');
          return;
        }

        setFormData({
          title: car.title || '',
          description: car.description || '',
          carType: car.carType || '',
          brand: car.brand || '',
          model: car.model || '',
          year: car.year || '',
          transmission: car.transmission || '',
          location: car.location || '',
          availableFrom: car.availableFrom?.split('T')[0] || '',
          availableTo: car.availableTo?.split('T')[0] || '',
          rentalPrice: car.rentalPrice || '',
          image: null,
        });
      } catch (err) {
        console.error('❌ Failed to fetch car data:', err);
        alert('Error loading car data.');
      }
    };

    if (id) fetchCar();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await axios.put(`https://localhost:7037/api/CarOwner/UpdateCar/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Car updated successfully!');
      navigate('/CarOwnerDashboard');
    } catch (err) {
      console.error('❌ Failed to update car:', err);
      alert('Failed to update car.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D2541] mb-8 text-center">Edit Car</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border border-gray-300 rounded-md p-3" required />

          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border border-gray-300 rounded-md p-3" required></textarea>

          <select name="carType" value={formData.carType} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required>
            <option value="">Select Car Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="4x4">4x4</option>
            <option value="Hatchback">Hatchback</option>
          </select>

          <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full border border-gray-300 rounded-md p-3" required />
          <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="w-full border border-gray-300 rounded-md p-3" required />
          <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="w-full border border-gray-300 rounded-md p-3" required />

          <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required>
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>

          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border border-gray-300 rounded-md p-3" required />

          <div className="flex flex-col md:flex-row gap-4">
            <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required />
            <input type="date" name="availableTo" value={formData.availableTo} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required />
          </div>

          <input type="number" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} placeholder="Rental Price per day ($)" className="w-full border border-gray-300 rounded-md p-3" required />

          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" />

          <button type="submit" className="w-full bg-[#2D2541] text-white py-3 rounded-md hover:bg-[#1f1b35] transition">
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
