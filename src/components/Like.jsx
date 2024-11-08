import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {likeCountFamily} from "../store/like"
import { useRecoilState } from 'recoil';

export function LikeButton({ postId }) {
  const [likeCount,setLikeCount] = useRecoilState( likeCountFamily(postId));
  
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
  
      
      const newLikeCount = await response.data.likeCount;
    
      
      
      setLikeCount( newLikeCount);
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
        className={`flex items-center justify-center px-3 py-1 rounded-full font-semibold text-sm 
                    ${liked ? 'bg-red-500' : 'bg-gray-200'} text-white shadow-md 
                    hover:bg-red-600 transition duration-300 ease-in-out 
                    sm:px-4 sm:py-2`} // Adjust padding for small screens
      >
        <span className={`mr-1 text-lg ${liked ? 'text-red-600' : 'text-gray-400'} 
                         sm:mr-2 sm:text-xl`} // Adjust icon size for small screens
        >
          ❤️
        </span>
        <span className={`text-sm ${liked ? 'text-white' : 'text-gray-800'} 
                          sm:text-base`}>{likeCount}</span> {/* Adjust text size for small screens */}
      </button>

      {/* ToastContainer to render toast notifications */}
      <ToastContainer />
    </>
  );
}
