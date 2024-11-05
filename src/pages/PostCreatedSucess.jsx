import React from 'react';
import { useNavigate } from 'react-router-dom';

export function PostCreatedSuccess() {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/profile'); // Redirect to the user profile page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">Post Created Successfully!</h1>
        <p className="mt-4 text-lg text-gray-700">Your post has been created and is now live.</p>
        <button
          onClick={handleGoToProfile}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}
