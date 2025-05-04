import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RenterDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // بيانات وهمية بدل API
    const dummyRequests = [
      {
        id: 1,
        status: 'Accepted',
        requestDate: '2025-05-01',
        licenseDocumentPath: 'docs/license1.pdf',
        proposalDocumentPath: 'docs/proposal1.pdf',
        car: {
          id: 101,
          title: 'Toyota Corolla',
          location: 'Cairo',
          availableFrom: '2025-05-10',
          availableTo: '2025-06-10'
        }
      },
      {
        id: 2,
        status: 'Pending',
        requestDate: '2025-05-02',
        licenseDocumentPath: 'docs/license2.pdf',
        proposalDocumentPath: 'docs/proposal2.pdf',
        car: {
          id: 102,
          title: 'Jeep Wrangler',
          location: 'Alexandria',
          availableFrom: '2025-05-15',
          availableTo: '2025-06-15'
        }
      },
      {
        id: 3,
        status: 'Rejected',
        requestDate: '2025-05-03',
        licenseDocumentPath: 'docs/license3.pdf',
        proposalDocumentPath: 'docs/proposal3.pdf',
        car: {
          id: 103,
          title: 'Hyundai Elantra',
          location: 'Giza',
          availableFrom: '2025-05-20',
          availableTo: '2025-06-20'
        }
      },
    ];

    setRequests(dummyRequests);
  }, []);

  const acceptedCars = requests.filter(req => req.status === 'Accepted');

  const handleAddFeedback = (carId) => {
    navigate(`/Feedback/${carId}`);
  };

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
                req.status === 'Accepted' ? 'text-green-600' :
                req.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'
              }>{req.status}</span></p>
              <p className="text-sm text-gray-600 mb-1"><strong>Requested On:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>License:</strong> {req.licenseDocumentPath.split('/').pop()}</p>
              <p className="text-sm text-gray-600"><strong>Proposal:</strong> {req.proposalDocumentPath.split('/').pop()}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ قسم العربيات المؤجرة فعلاً */}
      {acceptedCars.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#2D2541] mb-4">My Rented Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedCars.map((req) => (
              <div key={req.car.id} className="bg-green-50 border border-green-300 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-[#2D2541] mb-1">{req.car.title}</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {req.car.location}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Start Date:</strong> {req.car.availableFrom}</p>
                <p className="text-sm text-gray-700 mb-3"><strong>End Date:</strong> {req.car.availableTo}</p>

                <button
                  onClick={() => handleAddFeedback(req.car.id)}
                  className="bg-[#2D2541] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1a33] transition"
                >
                  Add Feedback
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenterDashboard;
