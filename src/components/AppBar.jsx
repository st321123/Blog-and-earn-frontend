import React, { useEffect, useState } from 'react';
import { WalletDetails } from './WalletDetails';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Import FaPlus icon

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export function NavBar() {

  
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("token"); // Remove the user token
    navigate("/signin"); // Redirect to signin page
  };

  useEffect(() => {
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await axios.get(`${BASE_URL}/user`, {
            headers: {
              Authorization: token
            }
          });
       
          
          setUser(userResponse.data.userDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo with Home link */}
        <Link to="/" className="text-white text-3xl font-extrabold flex items-center">
          B&E
        </Link>

        {/* Right side - Conditional Navigation Links */}
        {token ? (
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Clickable Balance */}
            <div 
              onClick={toggleModal} 
              className="text-white text-sm md:text-lg font-medium hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md ml-4 cursor-pointer">
              Balance: ${user.coins !== undefined ? user.coins.toFixed(2) : "Loading..."}
            </div>

            {/* Home Link */}
            <Link
  to="/"
  className="text-white hidden md:block text-sm md:text-lg font-medium hover:text-yellow-400 transition-colors duration-300 md:flex md:items-center md:justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
  Home
</Link>

            {/* Create Profile */}
            <Link
  to="/create-post"
  className="text-white text-sm md:text-lg font-medium hover:text-yellow-400 transition-all duration-300 ease-in-out transform flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
  <span className="md:hidden flex items-center">
    <FaPlus className="mr-1" /> {/* Plus icon for small screens */}
  </span>
  <span className="hidden md:inline">Create</span> {/* Show 'Create' on medium and larger screens */}
</Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-all duration-300 ease-in-out transform h-10 md:h-12 px-3 md:px-4 rounded-md">
              <div className={`flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10 bg-blue-500 text-white font-bold border-2 border-white`}>
                {user.userName && user.userName.charAt(0)}
              </div>
              <span className="hidden md:flex text-sm md:text-lg font-medium flex items-center">
                {user.userName && user.userName.split(" ")[0]}
              </span>
            </Link>

            {/* Logout */}
            <Link
              to="/signin"
              onClick={handleLogout}
              className="text-white text-sm md:text-lg font-medium hover:text-yellow-400 transition-all duration-300 ease-in-out transform flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
              Logout
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Clickable Balance for No Token */}
            <div 
              className="text-white text-sm md:text-lg font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
              Balance: $0.00
            </div>

            {/* Login Button */}
            <Link
              to="/signin"
              className="text-white text-sm md:text-lg font-medium hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
              Login
            </Link>

            {/* Signup Button */}
            <Link
              to="/signup"
              className="text-white text-sm md:text-lg font-medium hover:text-yellow-400 transition-all duration-300 ease-in-out transform flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-md">
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Modal for User Details */}
      {isModalOpen && (
        <WalletDetails user={user} toggleModal={toggleModal} />
      )}
    </nav>
  );
}
