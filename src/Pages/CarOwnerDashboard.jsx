import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarOwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('cars');
  const [cars, setCars] = useState([]);
  const [proposals, setProposals] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsRes = await axios.get('https://localhost:7037/api/CarOwner/MyCars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(carsRes.data.$values || []);

        const proposalsRes = await axios.get('https://localhost:7037/api/CarOwner/RentalRequests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProposals(proposalsRes.data.$values || []);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <div className="min-h-screen flex bg-[#f4f4f4]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#d1d1d1] p-6">
        <h2 className="text-xl font-bold text-[#2D2541] mb-6">Car Owner Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection('cars')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'cars' ? 'bg-[#2D2541] text-white' : 'bg-white text-[#2D2541]'}`}
            >
              My Cars
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('requests')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'requests' ? 'bg-[#2D2541] text-white' : 'bg-white text-[#2D2541]'}`}
            >
              Rental Requests
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Car Owner Dashboard</h1>

        {activeSection === 'cars' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Cars</h2>
              <button
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-[#1f1b35] transition text-sm"
                onClick={() => navigate('/AddCar')}
              >
                Add New Car
              </button>
            </div>
            {cars.map(car => (
              <div key={car.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{car.title}</p>
                  <p className="text-gray-500 text-sm">Status: {car.rentalStatus}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
                    onClick={() => navigate(`/EditCar/${car.id}`)}
                  >
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
          </section>
        )}

        {activeSection === 'requests' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Rental Requests</h2>
            {proposals.map(p => (
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
          </section>
        )}
      </main>
    </div>
  );
};

export default CarOwnerDashboard;
