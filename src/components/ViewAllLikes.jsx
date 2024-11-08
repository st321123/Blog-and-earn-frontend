import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './Loading';
export function ViewAllLikes({ postId, token}) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    

    useEffect(() => {
        const handleLikeList = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${postId}/likes`, {
                    headers: {
                        Authorization: token,
                    },
                });
               
                setLikes(response.data.likes); // Assuming response.data.likes is an array of users
               
            } catch (error) {
                // console.error("Error fetching like list:", error);
            } finally {
                setLoading(false);
            }
        };

        handleLikeList();
    }, [postId, token,isModalOpen === true]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (loading) {
        return "Loading";
    }

    return (
        <div>
            {likes.length > 0 &&  <button onClick={toggleModal} className="text-blue-500 underline">
                View Likes
            </button>}
           

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Liked by:</h2>
                        {likes.length > 0 ?  (
                            
                            <ul className="list-disc list-inside">
                                {likes && likes.map((user) => (
                                    <li key={user._id} className="py-1">
                                        {user.userName} {/* Assuming userName is the property containing the user's name */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No likes yet.</div>
                        )}
                        <button
                            onClick={toggleModal}
                            className="mt-4 text-red-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
