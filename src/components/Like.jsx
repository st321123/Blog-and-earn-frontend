import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LikeButton({ postId, lC, updateLikeCount }) {
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleLikeToggle = async () => {
    if (!token) {
      toast.warn("Please log in to like this post!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/${postId}/likes`, {}, {
        headers: {
          Authorization: token
        }
      });
      const newLikeCount = response.data.likeCount;
      setLiked(!liked);
      updateLikeCount(postId, newLikeCount);
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error("An error occurred while liking the post. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <button
        onClick={handleLikeToggle}
        className={`flex items-center justify-center px-4 py-2 rounded-full font-semibold text-sm 
                    ${liked ? 'bg-red-500' : 'bg-gray-200'} text-white shadow-md hover:bg-red-600 
                    transition duration-300 ease-in-out`}
      >
        <span className={`mr-2 text-lg ${liked ? 'text-red-600' : 'text-gray-400'}`}>
          ❤️
        </span>
        <span>{lC}</span>
      </button>

      {/* ToastContainer to render toast notifications */}
      <ToastContainer />
    </>
  );
}
