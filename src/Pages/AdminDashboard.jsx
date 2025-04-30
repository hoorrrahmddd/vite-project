import React, { useState } from 'react';

const AdminDashboard = () => {
  const [pendingAccounts, setPendingAccounts] = useState([
    { id: 1, name: 'Hoor', email: 'Hoor@example.com' },
    { id: 2, name: 'Nirvana', email: 'Niravna@example.com' },
  ]);

  const [pendingPosts, setPendingPosts] = useState([
    { id: 1, title: 'Toyota Corolla 2022' },
    { id: 2, title: 'BMW X5 2021' },
  ]);

  const handleAcceptAccount = (id) => {
    setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    console.log('Account accepted with ID:', id);
  };

  const handleRejectAccount = (id) => {
    setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    console.log('Account rejected with ID:', id);
  };

  const handleAcceptPost = (id) => {
    setPendingPosts(pendingPosts.filter(post => post.id !== id));
    console.log('Post accepted with ID:', id);
  };

  const handleRejectPost = (id) => {
    setPendingPosts(pendingPosts.filter(post => post.id !== id));
    console.log('Post rejected with ID:', id);
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
                <p className="font-semibold">{account.name}</p>
                <p className="text-gray-500 text-sm">{account.email}</p>
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
                <p className="font-semibold">{post.title}</p>
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
