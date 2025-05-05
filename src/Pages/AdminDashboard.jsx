import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUserCheck, FaCarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('owners');
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsRes = await axios.get('https://localhost:7037/api/Admin/pending-car-owners', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const postsRes = await axios.get('https://localhost:7037/api/Admin/pending-cars', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingAccounts(accountsRes.data.$values || []);
        setPendingPosts(postsRes.data.$values || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [token]);

  const handleAcceptAccount = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/approve-car-owner/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    } catch (err) {
      console.error('Failed to accept account:', err);
    }
  };

  const handleRejectAccount = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/reject-car-owner/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    } catch (err) {
      console.error('Failed to reject account:', err);
    }
  };

  const handleAcceptPost = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/approve-car/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingPosts(pendingPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Failed to accept post:', err);
    }
  };

  const handleRejectPost = async (id) => {
    try {
      await axios.delete(`https://localhost:7037/api/Admin/reject-car/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingPosts(pendingPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Failed to reject post:', err);
    }
  };

  return (
    <div className="text-[#2D2541] flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white text-black p-6 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/src/assets/admin.svg"
            alt="Admin"
            className="w-44 h-44 rounded-full object-cover border-white shadow-md"
          />
        </div>
        <nav className="mt-10 flex flex-col gap-3">
          <button
            onClick={() => setActiveSection('owners')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition duration-200 ${activeSection === 'owners'
                ? 'bg-[#d4d3d3] text-[#2D2541] font-semibold shadow-md'
                : 'hover:bg-[#a1a0a0]'
              }`}
          >
            <FaUserCheck size={20} />
            <span>Pending Car Owners</span>
          </button>

          <button
            onClick={() => setActiveSection('posts')}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${activeSection === 'posts'
                ? 'bg-[#d4d3d3] text-[#2D2541] font-semibold shadow-md'
                : 'hover:bg-[#a1a0a0]'
              }`}
          >
            <FaCarAlt size={20} />
            <span>Pending Car Posts</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'owners' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold mb-4">Pending Car Owners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingAccounts.map(account => (
                <div key={account.id} className="bg-white p-6 rounded-xl shadow-lg shadow-gray-300 flex flex-col items-center text-center">
                  <img
                    src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(account.username)}`}
                    alt="User Avatar"
                    className="w-40 h-40 rounded-full object-cover border-4 border-[#4b4b4b] shadow-2xl mb-4"
                  />
                  <p className="text-3xl font mb-2 ">{account.username}</p>
                  <div className="text-m text-gray-700 space-y-1">
                    <p>🆔 {account.id}</p>
                    <p>📧 {account.email}</p>
                    <p>📞 {account.phone || '—'}</p>
                    <p>📍 {account.address || '—'}</p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAcceptAccount(account.id)}
                      className="bg-[#28777B] hover:bg-emerald-700 text-white px-11 py-2 rounded-md text-sm shadow transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectAccount(account.id)}
                      className="bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white px-11 py-2 rounded-md text-sm shadow transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'posts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold mb-4">Pending Car Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-xl shadow-lg "

                >
                  <img
                    src={`https://localhost:7037/${post.imagePath}`}
                    alt="Car"
                    onError={(e) => { e.target.src = '/default-car.jpg'; }}
                    className="w-full h-48 object-cover rounded-lg mb-3 border border-[#ddd]"
                  />
                  <h3 className="text-xl font-bold text-[#2D2541] mb-1">{post.title || `Car #${post.id}`}</h3>
                  <p className="text-sm text-gray-500 mb-2">Post ID: {post.id}</p>

                  <div className="text-sm text-gray-700 mb-4 space-y-1 ">
                    <p><strong>Brand:</strong> {post.brand}</p>
                    <p><strong>Model:</strong> {post.model}</p>
                    <p><strong>Year:</strong> {post.year}</p>
                    <p><strong>Type:</strong> {post.carType}</p>
                    <p><strong>Location:</strong> {post.location}</p>
                    <p><strong>Price:</strong> {post.rentalPrice} EGP/day</p>
                    <p><strong>Available:</strong> {post.availableFrom?.split('T')[0]} → {post.availableTo?.split('T')[0]}</p>
                  </div>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleAcceptPost(post.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectPost(post.id)}
                      className="bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white px-6 py-2 rounded-md text-sm transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
