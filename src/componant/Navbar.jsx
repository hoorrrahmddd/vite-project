import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const links = [
  { id: 1, page: "HOME", path: "/" },
  { id: 2, page: "ABOUT US", path: "/About" },
  { id: 3, page: "CARS", path: "/Cars" },
  { id: 4, page: "CONTACT US ", path: "/contact" }
]
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between bg-white rounded-full p-4 h-1 ">
        {/* Navbar Branding */}
        <div className="flex items-center gap-2">
          <h3 className="text-2xl text-gray-500">CA</h3>
          <div className="border-2 border-black text-white flex justify-center items-center w-8 h-8">
            <h3 className="text-2xl font-bold text-[#2D2541]">R</h3>
          </div>
          <h5 className="text-2xl text-gray-500">ENTAL</h5>
        </div>

        {/* Links */}
        <ul className="flex gap-8 items-center justify-center flex-1">
          {links.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-blue-500 no-underline font-bold"
                    : "text-gray-500 hover:text-[#414848] hover:border-[#414848] duration-200 py-2 px-3 no-underline"
                }
              >
                {item.page}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-4">
          <button  onClick={() => navigate('/Login')}
          className="bg-white text-[#B6B8B8] border border-[#B6B8B8] px-6 py-2 rounded-full
           hover:text-black hover:bg-[#e0e0e0] transition duration-500">
            Login
          </button>
          <button   onClick={() => navigate('/Signup')}
           className="bg-[#000000] text-white border px-6 py-2 rounded-full hover:bg-[#e0e0e0] hover:text-black transition duration-500">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
export default Navbar

