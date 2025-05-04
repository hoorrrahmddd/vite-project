import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Feedback = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // دلوقتي مفيش API، فنعمل Console ونرجع للداشبورد
    console.log('Feedback submitted:', { carId, rating, comment });
    alert('✅ Feedback submitted (fake)!');
    navigate('/RenterDashboard');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-[#2D2541] mb-4">Add Feedback for Car #{carId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-[#2D2541] text-white px-4 py-2 rounded hover:bg-[#1a1935]">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
