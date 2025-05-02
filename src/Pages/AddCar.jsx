import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
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
      const res = await axios.post('https://localhost:7037/api/CarOwner/AddCar', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert(' Car added successfully and pending admin approval!');
      console.log(res.data);
    } catch (err) {
      console.error(' Failed to add car:', err);
      alert('Failed to add car. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D2541] mb-8 text-center">Add New Car</h2>
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

          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required />

          <button type="submit" className="w-full bg-[#2D2541] text-white py-3 rounded-md hover:bg-[#1f1b35] transition">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
