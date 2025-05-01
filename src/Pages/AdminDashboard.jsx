import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountsRes = await axios.get('https://localhost:7037/api/Admin/pending-car-owners', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const postsRes = await axios.get('https://localhost:7037/api/Admin/pending-cars', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPendingAccounts(accountsRes.data.$values || []);
        setPendingPosts(postsRes.data.$values || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        alert("An error occurred while loading the data");
      }
    };

    fetchData();
  }, [token]);

  const handleAcceptAccount = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/approve-car-owner/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to verify the account");
    }
  };

  const handleRejectAccount = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/reject-car-owner/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    } catch (err) {
      console.error(err);
      alert("failed to delete   ");
    }
  };

  const handleAcceptPost = async (id) => {
    try {
      await axios.post(`https://localhost:7037/api/Admin/approve-car/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingPosts(pendingPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
      alert(" falied to confirm  ");
    }
  };

  const handleRejectPost = async (id) => {
    try {
      await axios.delete(`https://localhost:7037/api/Admin/reject-car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingPosts(pendingPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
      alert(" failed to delete  ");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-10">
      <h1 className="text-3xl font-bold text-[#2D2541] mb-8">Admin Dashboard</h1>

      {/* Manage Car Owners */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pending Car Owner Accounts</h2>
        <div className="space-y-4">
          {pendingAccounts.map(account => (
            <div key={account.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{account.username}</p>
                <p className="text-gray-500 text-sm">ID: {account.id}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleAcceptAccount(account.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">
                  Accept
                </button>
                <button onClick={() => handleRejectAccount(account.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manage Car Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Car Posts</h2>
        <div className="space-y-4">
          {pendingPosts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{post.title || `Car #${post.id}`}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleAcceptPost(post.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">
                  Accept
                </button>
                <button onClick={() => handleRejectPost(post.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">
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

export default AdminDashboard;
