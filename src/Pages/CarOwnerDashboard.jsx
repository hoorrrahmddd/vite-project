import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarOwnerDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [proposals, setProposals] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🟢 جلب العربيات
        const carsRes = await axios.get('https://localhost:7037/api/CarOwner/MyCars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(' Cars Response:', carsRes.data);
        setCars(carsRes.data.$values || []);
        console.log(typeof cars, cars)
        // 🟢 جلب الطلبات
        const proposalsRes = await axios.get('https://localhost:7037/api/CarOwner/RentalRequests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(' Rental Requests Response:', proposalsRes.data);
        setProposals(proposalsRes.data.$values || []);
        
      } catch (error) {
        console.error(' Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [token]);
  

  const handleDeleteCar = async (id) => {
    const car = cars.find(c => c.id === id);
    if (car.rentalStatus === 'Rented') {
      alert('Cannot delete a rented car!');
      return;
    }
    try {
      await axios.delete(`https://localhost:7037/api/CarOwner/DeleteCar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(prev => prev.filter(car => car.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleAcceptProposal = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/CarOwner/AcceptRequest/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposals(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Accept failed:', error);
    }
  };

  const handleRejectProposal = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/CarOwner/RejectRequest/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposals(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Reject failed:', error);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-10">
      <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Car Owner Dashboard</h1>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Cars</h2>
          <button
            className="bg-[#2D2541] text-white px-6 py-2 rounded-md hover:bg-[#1f1b35] transition text-sm"
            onClick={() => navigate('/AddCar')}
          >
            Add New Car
          </button>
        </div>
        <div className="space-y-4">
          {Array.isArray(cars) && cars.map(car => (

            <div key={car.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{car.title}</p>
                <p className="text-gray-500 text-sm">Status: {car.rentalStatus}</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
                onClick={() => navigate(`/EditCar/${car.id}`)}>
                  Edit 
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Rental Proposals</h2>
        <div className="space-y-4">
           {Array.isArray(proposals) && proposals.map(p => (

            <div key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{p.renterName || `Renter ID: ${p.renterId}`}</p>
                <p className="text-gray-500 text-sm">Car: {p.car?.title || `Car ID: ${p.carId}`}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAcceptProposal(p.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectProposal(p.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarOwnerDashboard;
