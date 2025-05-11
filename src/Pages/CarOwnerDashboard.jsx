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
        setCars(carsRes.data || []);


        const proposalsRes = await axios.get('https://localhost:7037/api/CarOwner/RentalRequests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProposals(proposalsRes.data || []);

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
      <aside className="w-64 bg-[#f0f0f0] p-6">
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
      

        {activeSection === 'cars' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">My Cars</h1>
              <button
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-[#1f1b35] transition text-sm"
                onClick={() => navigate('/AddCar')}
              >
                Add New Car
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {cars.map(car => (
    <div 
      key={car.id}
      className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 
      overflow-hidden transition hover:shadow-lg duration-300"
    >
      {/* صورة السيارة */}
      <div className="w-full h-48">
        <img
          src={`https://localhost:7037/${car.imagePath}`}
          alt="Car"
          onError={(e) => { e.target.src = '/default-car.jpg'; }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* التفاصيل */}
      <div className="p-5 text-[#2D2541]">
        <h2 className="text-xl font-bold mb-2">{car.title || `Car #${car.id}`}</h2>
        <p className="text-xs text-black mb-3">Status: {car.rentalStatus}</p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
          <p><span className="text-[#0C639D] font-bold">Brand:</span> {car.brand}</p>
          <p><span className="text-[#0C639D] font-bold">Model:</span> {car.model}</p>
          <p><span className="text-[#0C639D] font-bold">Year:</span> {car.year}</p>
          <p><span className="text-[#0C639D] font-bold">Type:</span> {car.carType}</p>
          <p className="col-span-2"><span className="text-[#0C639D] font-bold">Price:</span> <span className="font-semibold text-[#9d160c]">{car.rentalPrice} EGP/day</span></p>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            className="bg-[#28777B] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm w-full"
            onClick={() => navigate(`/EditCar/${car.id}`)}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => handleDeleteCar(car.id)}
            className="bg-[#FFEDEF] text-[#EF6370] px-7 py-2 
            rounded-md text-l hover:bg-[#EF6370] hover:text-white font-bold flex items-center gap-2"
          >
             Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


          </section>
        )}

{activeSection === 'requests' && (
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold mb-6">Rental Requests</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {proposals.map(p => (
        <div
          key={p.id}
          className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 
          overflow-hidden transition hover:shadow-lg duration-300"
        >
          {/* العنوان + بيانات السيارة */}  
          <div className="p-5 text-[#2D2541] space-y-2">
            <h2 className="text-xl font-bold mb-1">Request from: {p.renterName || `Renter ID: ${p.renterId}`}</h2>
            <p className="text-sm text-gray-600">Car ID: {p.carId}</p>
            <p className="text-sm text-gray-600">Status: 
              <span className={`ml-1 font-medium ${p.status === 'Pending' ? 'text-yellow-600' : p.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                {p.status}
              </span>
            </p>
            <div className="text-sm text-gray-600">
              <p><strong>License:</strong> <a href={`https://localhost:7037/${p.licenseDocumentPath}`} target="_blank" rel="noreferrer" className="text-blue-700 underline">View</a></p>
              <p><strong>Proposal:</strong> <a href={`https://localhost:7037/${p.proposalDocumentPath}`} target="_blank" rel="noreferrer" className="text-blue-700 underline">View</a></p>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 px-5 pb-5 mt-2">
            <button
              onClick={() => handleAcceptProposal(p.id)}
              className="bg-[#28777B] text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition text-sm w-full"
            >
              ✅ Accept
            </button>
            <button
              onClick={() => handleRejectProposal(p.id)}
              className="bg-[#FFEDEF] text-[#EF6370] px-4 py-2 rounded-md hover:bg-[#EF6370] hover:text-white transition text-sm w-full"
            >
              ❌ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

      </main>
    </div>
  );
};

export default CarOwnerDashboard;
