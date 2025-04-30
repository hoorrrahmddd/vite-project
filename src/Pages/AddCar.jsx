import React, { useState } from 'react';

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
    availabilityStart: '',
    availabilityEnd: '',
    rentalPrice: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Car Data:', formData);
    // هنا تبعت البيانات للباك اند عن طريق fetch أو axios
    alert('Car added successfully!');
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
            <option value="Coupe">4x4</option>
            <option value="Truck">Hatchback</option>
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
            <input type="date" name="availabilityStart" value={formData.availabilityStart} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required />
            <input type="date" name="availabilityEnd" value={formData.availabilityEnd} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3" required />
          </div>

          <input type="number" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} placeholder="Rental Price per day ($)" className="w-full border border-gray-300 rounded-md p-3" required />

          <button type="submit" className="w-full bg-[#2D2541] text-white py-3 rounded-md hover:bg-[#1f1b35] transition">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
