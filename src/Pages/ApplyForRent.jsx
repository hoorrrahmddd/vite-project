import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyForRent = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [licenseFile, setLicenseFile] = useState(null);
  const [proposalFile, setProposalFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!licenseFile || !proposalFile) {
      alert('Please upload both documents.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('carId', carId);
      formData.append('startDate', new Date().toISOString()); // تقدر تغيرها بتواريخ من الفورم لو حبيت
      formData.append('endDate', new Date().toISOString());
      formData.append('licenseDocument', licenseFile);
      formData.append('proposalDocument', proposalFile);
  
      const token = localStorage.getItem('token');
  
      const response = await fetch('https://localhost:7037/api/Renter/rent', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        alert(errorData.message || 'Failed to submit rental request.');
        return;
      }
  
      alert('Rental request submitted successfully!');
      navigate('/RenterDashboard');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-[#2D2541] mb-4">Apply for Car #{carId}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Upload License Document:</label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setLicenseFile(e.target.files[0])}
            required
            className="block w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Upload Proposal Document:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setProposalFile(e.target.files[0])}
            required
            className="block w-full"
          />
        </div>

        <button type="submit" className="bg-[#2D2541] text-white px-5 py-2 rounded hover:bg-[#1a1935]">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ApplyForRent;
