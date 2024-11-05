import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CreatePost() {
    const token = localStorage.getItem("token");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/createPost`, {
                title: title,
                description: description
            }, {
                headers: {
                    Authorization: token
                }
            });

            if (response) { // Check for successful creation
                setSuccess(true);
                navigate('/post-created-sucess');
            }

            // Reset form fields
            setTitle("");
            setDescription("");
            setError("");
        } catch (e) {
            setError(e.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100" style={{ height: 'calc(100vh - 88px)' }}>
            <div className="flex flex-col w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl font-bold mb-4">Create a Post</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">Post created successfully!</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-left mb-2 text-lg font-medium" htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a descriptive title for your post"
                            className="border border-gray-300 rounded w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-left mb-2 text-lg font-medium" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What’s happening? Share your thoughts."
                            className="border border-gray-300 rounded w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            rows="6"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-300 text-lg w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
