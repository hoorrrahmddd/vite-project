// ======================== Rent Details Page ========================

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

const cars = [
    {
        id: 1,
        image: '/src/assets/car1.jpg',
        title: 'Luxury Sedan - BMW 530i',
        price: 75,
        description: 'Spacious and comfortable, perfect for family trips.',
    },
    {
        id: 2,
        image: '/src/assets/car2.jpg',
        title: 'Urban Hatchback - Toyota Yaris',
        price: 45,
        description: 'Compact and efficient for city use.',
    },
    {
        id: 3,
        image: '/src/assets/car3.jpg',
        title: 'Off-road Adventure - Jeep Wrangler',
        price: 90,
        description: 'Perfect for off-road fun and tough roads.',
    },
];

const RentDetails = () => {
    const { carId } = useParams();
    const car = cars.find((c) => c.id === parseInt(carId));
    const [license, setLicense] = useState(null);
    const [proposal, setProposal] = useState(null);
    const navigate = useNavigate();


    const totalPrice = car.price;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Rental confirmed:', { carId, license, proposal });
        alert('Rental request submitted!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#353536] to-slate-400 px-6 py-20 lg:px-32 relative overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute top-[-100px] left-[-150px] w-72 h-72 bg-white opacity-5 rounded-full z-0"></div>
            <div className="absolute bottom-[-80px] right-[-120px] w-80 h-80 bg-white opacity-5 rounded-full z-0"></div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-bold text-[#2D2541] mb-2">Confirm Your Rental</h2>
                    <p className="text-sm text-gray-500">You're one step away from booking your ride</p>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#f9f9f9] rounded-xl p-6 shadow flex flex-col gap-4 w-full md:w-1/2"
                    >
                        <div className="flex flex-col gap-4">
                            <label className="text-sm text-gray-700">
                                Upload your license:
                                <input
                                    type="file"
                                    onChange={(e) => setLicense(e.target.files[0])}
                                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    required
                                />
                            </label>
                            <label className="text-sm text-gray-700">
                                Upload your proposal document:
                                <input
                                    type="file"
                                    onChange={(e) => setProposal(e.target.files[0])}
                                    className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                                    required
                                />
                            </label>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-700">
                                Total Price: <strong className="text-[#2D2541]">${totalPrice}</strong>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 bg-[#2D2541] text-white py-2 rounded-md hover:bg-[#413364] transition duration-300"
                        >
                            Confirm Rental
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/Cars')}
                            className="text-sm text-gray-500 underline hover:text-[#2D2541] transition"
                        >
                            Cancel
                        </button>

                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center w-full md:w-1/2"
                    >
                        <img
                            src="/src/assets/rental-bg.jpg"
                            alt="Rental Illustration"
                            className="w-full h-80 object-cover rounded-xl shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-[#2D2541] mt-4">Your Next Ride Awaits</h3>
                        <p className="text-sm text-gray-600 mt-1 text-center">Secure your journey with ease and style.</p>
                    </motion.div>
                </div>

                <div className="text-xs text-gray-500 mt-10 text-center">
                    By submitting this request, you agree to our rental terms and conditions.
                </div>
            </motion.div>
        </div>
    );
};

export default RentDetails;
