import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-[#2D2541]">Admin Panel</div>
        <div className="flex gap-4">

          <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded">Logout</button>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
