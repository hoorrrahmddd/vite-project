import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const CarOwnerDashboard = () => {
  const [cars, setCars] = useState([
    { id: 1, title: 'Toyota Corolla 2022', status: 'Available' },
    { id: 2, title: 'BMW X5 2021', status: 'Rented' },
  ]);

  const [proposals, setProposals] = useState([
    { id: 1, carTitle: 'Toyota Corolla 2022', renterName: 'Ahmed Ali' },
    { id: 2, carTitle: 'BMW X5 2021', renterName: 'Sara Mohamed' },
  ]);

  const handleDeleteCar = (id) => {
    const car = cars.find(car => car.id === id);
    if (car.status === 'Rented') {
      alert('Cannot delete a rented car!');
      return;
    }
    setCars(cars.filter(car => car.id !== id));
    console.log('Car deleted with ID:', id);
  };

  const handleAcceptProposal = (id) => {
    setProposals(proposals.filter(p => p.id !== id));
    console.log('Proposal accepted with ID:', id);
  };

  const handleRejectProposal = (id) => {
    setProposals(proposals.filter(p => p.id !== id));
    console.log('Proposal rejected with ID:', id);
  };
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-10">
      <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Car Owner Dashboard</h1>

      {/* My Cars Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Cars</h2>
          <button className="bg-[#2D2541] text-white px-6 py-2 rounded-md hover:bg-[#1f1b35] transition text-sm"
          onClick={()=> navigate('/AddCar')}
          >
            Add New Car
          </button>
        </div>
        <div className="space-y-4">
          {cars.map(car => (
            <div key={car.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold"> {car.title}</p>
                <p className="text-gray-500 text-sm">Status: {car.status}</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm">
                  Edit
                </button>
                <button onClick={() => handleDeleteCar(car.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proposals Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Rental Proposals</h2>
        <div className="space-y-4">
          {proposals.map(proposal => (
            <div key={proposal.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{proposal.renterName}</p>
                <p className="text-gray-500 text-sm">Car: {proposal.carTitle}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleAcceptProposal(proposal.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">
                  Accept
                </button>
                <button onClick={() => handleRejectProposal(proposal.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">
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
