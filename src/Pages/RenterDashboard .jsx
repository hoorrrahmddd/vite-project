// ======================== Renter Dashboard ========================

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RenterDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7037/api/Renter/MyRequests', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch your rent requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-[#2D2541] mb-6">My Rent Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You have no rent requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-lg shadow-md p-4 border">
              <h3 className="text-xl font-semibold text-[#2D2541] mb-2">{req.car.title}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {req.car.location}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> <span className={
                req.status === 'Accepted' ? 'text-green-600' : req.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'
              }>{req.status}</span></p>
              <p className="text-sm text-gray-600 mb-1"><strong>Requested On:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>License:</strong> {req.licenseDocumentPath.split('\\').pop()}</p>
              <p className="text-sm text-gray-600"><strong>Proposal:</strong> {req.proposalDocumentPath.split('\\').pop()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenterDashboard;
