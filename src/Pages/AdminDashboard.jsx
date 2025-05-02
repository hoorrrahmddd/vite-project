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
      {/* Sidebar */}
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

      {/* Content Area */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Admin Dashboard</h1>

        {activeSection === 'owners' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[#2D2541] space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Pending Car Owners</h2>
            {pendingAccounts.map(account => (
              <div key={account.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{account.username}</p>
                  <p className="text-gray-500 text-sm">ID: {account.id}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleAcceptAccount(account.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">Accept</button>
                  <button onClick={() => handleRejectAccount(account.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">Reject</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSection === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[#2D2541] space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Pending Car Posts</h2>
            {pendingPosts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{post.title || `Car #${post.id}`}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleAcceptPost(post.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">Accept</button>
                  <button onClick={() => handleRejectPost(post.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">Reject</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
