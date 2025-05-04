import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

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
    <div className="min-h-screen flex bg-[#f4f4f4]">
      <aside className="w-64 bg-[#d1d1d1] p-6">
        <h2 className="text-xl font-bold text-[#2D2541] mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection('owners')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'owners' ? 'bg-[#2D2541] text-white' : 'bg-white text-[#2D2541]'}`}
            >
              Pending Car Owners
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('posts')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'posts' ? 'bg-[#2D2541] text-white' : 'bg-white text-[#2D2541]'}`}
            >
              Pending Car Posts
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Admin Dashboard</h1>

        {activeSection === 'owners' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[#2D2541]"
          >
            <h2 className="text-2xl font-semibold mb-4">Pending Car Owners</h2>
            <div className="flex flex-wrap gap-6">
              {pendingAccounts.map(account => (
                <div key={account.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 max-w-md w-[450px]">
                  <img
                    src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(account.username)}`}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="text-lg font-semibold text-[#2D2541] mb-1">{account.username}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-1"> ID <span>{account.id}</span></p>
                      <p className="flex items-center gap-1">  Email<span>{account.email}</span></p>
                      <p className="flex items-center gap-1">📞 <span>{account.phone || '—'}</span></p>
                      <p className="flex items-center gap-1">📍 <span>{account.address || '—'}</span></p>
                    </div>
                  </div>


                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleAcceptAccount(account.id)} className="bg-[#167B47] text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm">
                      Accept
                    </button>
                    <button onClick={() => handleRejectAccount(account.id)} className="bg-[#FDEFF0] text-[#EF6370] px-3 py-1 rounded-md hover:bg-[#EF626F] hover:text-white text-sm">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[#2D2541] space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {pendingPosts.map(post => (
                <div
                  key={post.id}
                  className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg duration-300"
                >
                  <div className="w-full h-48">
                    <img
                      src={`https://localhost:7037/${post.imagePath}`}
                      alt="Car"
                      onError={(e) => { e.target.src = '/default-car.jpg'; }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 text-[#2D2541]">
                    <h2 className="text-xl font-bold mb-2">{post.title || `Car #${post.id}`}</h2>
                    <p className="text-xs text-gray-400 mb-3">Post ID: {post.id}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
                      <p><span className="text-[#0C639D] font-bold">Brand:</span> {post.brand}</p>
                      <p><span className="text-[#0C639D] font-bold">Model:</span> {post.model}</p>
                      <p><span className="text-[#0C639D] font-bold">Year:</span> {post.year}</p>
                      <p><span className="text-[#0C639D] font-bold">Type:</span> {post.carType}</p>
                      <p><span className="text-[#0C639D] font-bold">Location:</span> {post.location}</p>
                      <p><span className="text-[#0C639D] font-bold">Price:</span> <span className="font-semibold text-[#9d160c]">{post.rentalPrice} EGP/day</span></p>
                      <p className="col-span-2"><span className="text-[#0C639D] font-bold">Available:</span> {post.availableFrom?.split('T')[0]} → {post.availableTo?.split('T')[0]}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptPost(post.id)}
                        className="bg-[#167B47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition w-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectPost(post.id)}
                        className="bg-[#FFEDEF] text-[#EF6370] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#EF6370] hover:text-white transition w-full"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
