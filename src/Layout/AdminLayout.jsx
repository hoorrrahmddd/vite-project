// AdminLayout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';


const AdminLayout = ({ children }) => {
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
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white   px-6 py-4
       flex justify-between items-center rounded-lg">
              <div className="flex items-center gap-2">
          <h3 className="text-2xl text-gray-500">CA</h3>
          <div className="border-2 border-black text-white flex justify-center items-center w-8 h-8">
            <h3 className="text-2xl font-bold text-[#2D2541]">R</h3>
          </div>
          <h5 className="text-2xl text-gray-500">ENTAL</h5>
        </div>
        <div className="flex items-center gap-4">
        
        <button
  onClick={handleLogout}
  className="bg-[#FFEDEF] text-[#EF6370] px-7 py-2 
  rounded-md text-l hover:bg-[#EF6370] hover:text-white font-bold flex items-center gap-2"
>
  <FiLogOut size={20} />
  Logout
</button>

        </div>
      </nav>

     
      {/* Content */}
      <main className="pt-24 px-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;