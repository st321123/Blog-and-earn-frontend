import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false); // State to control comment visibility
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  
  const BASE_URL = import.meta.env.VITE_API_URL;
  
  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${postId}/comments`, {
          headers: { Authorization: token },
        });

       

        setComments(response.data.comments);
      } catch (error) {
      
      }
    };

    fetchComments();
  }, [postId]);

  // Handle new comment submission
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/${postId}/comments`,
        { content: newComment },
        { headers: { Authorization: token } }
      );

      setComments([...comments, response.data.comment]); // Add the new comment to the list
      setNewComment(""); // Clear input field
    } catch (error) {
      // console.error("Error adding comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/${postId}/comments/${commentId}`, {
        headers: { Authorization: token },
      });

      setComments(comments.filter((comment) => comment._id !== commentId)); // Remove deleted comment
    } catch (error) {
      // console.error("Error deleting comment:", error);
    }
  };

  // Toggle showing all comments
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Determine the comments to display
  const displayedComments = showAll ? comments : comments.slice(0, 1);
 
  

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-sm mb-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </div>

      <div className="space-y-4 mb-4">
        {displayedComments.map((comment) => (
          <div key={comment._id} className="flex flex-col bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <Link to = {`/${comment.userId._id}/profile`}  >
              <p className="text-gray-800 font-medium">{comment.userId.userName}</p>
              </Link>
              
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* "View All" button if there are more than 3 comments */}
      {comments.length > 1 && (
        <button
          onClick={toggleShowAll}
          className="text-blue-500 hover:text-blue-700 text-sm mb-4"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      )}

    
    </div>
  );
}
