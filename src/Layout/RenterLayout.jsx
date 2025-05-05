import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RenterLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('https://localhost:7037/api/User/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.warn('Logout API failed:', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');

    navigate('/');
  };

  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-[#2D2541]">Renter Dashboard</div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/RenterDashboard')} className="text-[#2D2541] hover:underline">
            My Rentals
          </button>
          <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default RenterLayout;
