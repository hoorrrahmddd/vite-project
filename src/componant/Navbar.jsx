import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const links = [
  { id: 1, page: "HOME", path: "/" },
  { id: 2, page: "ABOUT US", path: "/About" },
  { id: 3, page: "CARS", path: "/Cars" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }, 500); // كل نص ثانية يتأكد

    return () => clearInterval(interval); // ينضف الانترفال لما الكومبوننت يتقفل
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
  
    try {
     
      await axios.post('https://localhost:7037/api/User/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.warn('Logout API failed:', err);
    }
  
    // مسح التوكنات من اللوكل ستورج
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    setToken(null);
  
    //  اليوزر يرجع للهوم
    navigate('/');
  };
  
  

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">

        {/* Navbar Branding */}
        <div className="flex items-center gap-2">
          <h3 className="text-2xl text-gray-500">CA</h3>
          <div className="border-2 border-black text-white flex justify-center items-center w-8 h-8">
            <h3 className="text-2xl font-bold text-[#2D2541]">R</h3>
          </div>
          <h5 className="text-2xl text-gray-500">ENTAL</h5>
        </div>

        {/* Links */}
        <ul className="flex gap-8 items-center justify-center">
          {links.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold no-underline"
                    : "text-gray-500 hover:text-[#2D2541] duration-200 py-2 px-3 no-underline"
                }
              >
                {item.page}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white border px-6 py-2 rounded-full hover:bg-[#e0e0e0] hover:text-black transition duration-500"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/Login')}
                className="bg-white text-[#B6B8B8] border border-[#B6B8B8] px-6 py-2 rounded-full hover:text-black hover:bg-[#e0e0e0] transition duration-500"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/Register')}
                className="bg-black text-white border px-6 py-2 rounded-full hover:bg-[#e0e0e0] hover:text-black transition duration-500"
              >
                Register
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
