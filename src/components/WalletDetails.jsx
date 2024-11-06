import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_API_URL;

export function WalletDetails({ user, toggleModal }) {
    const [transactionsReceived, setTransactionsReceived] = useState([]);
    const [transactionsSent, setTransactionsSent] = useState([]);
    const [showMoreSent, setShowMoreSent] = useState(false);
    const [showMoreReceived, setShowMoreReceived] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        navigate("/");
    }
   
    

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${user._id}/transactions`, {
                    headers: {
                        Authorization: token
                    }
                });

              
                const { transactionsSend, transactionsRecieved } = response.data;

                if (transactionsSend.length > 0) {
                    setTransactionsSent(transactionsSend);
                }
                if (transactionsRecieved.length > 0) {
                    setTransactionsReceived(transactionsRecieved);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [toggleModal, token, user._id]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-80 relative mt-10 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">User Details</h2>
                    <button 
                        onClick={toggleModal} 
                        className="text-gray-500 hover:text-red-500"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <p><strong>Username:</strong> {user.userName}</p>
                <p><strong>Balance:</strong> ${user.coins !== undefined ? user.coins.toFixed(2) : "Loading..."}</p>

                <h3 className="text-lg font-semibold mt-4">Transactions Sent:</h3>
                {transactionsSent.length > 0 ? (
                    <>
                        {transactionsSent.slice(0, showMoreSent ? transactionsSent.length : 2).map((transaction) => (
                            <div key={transaction._id} className="mb-2 p-2 border rounded-md shadow-sm">
                                <p><strong>To:</strong> {transaction.recieverId.userName}</p>
                                <p><strong>Amount:</strong> ${transaction.amount}</p>
                                <p><strong>Status:</strong> {transaction.status}</p>
                                <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                        <button 
                            onClick={() => setShowMoreSent(!showMoreSent)} 
                            className="text-blue-500 hover:underline mt-2"
                        >
                            {showMoreSent ? "View Less" : "View More"}
                        </button>
                    </>
                ) : (
                    <p className="text-red-500">No transactions sent.</p>
                )}

                <h3 className="text-lg font-semibold mt-4">Transactions Received:</h3>
                {transactionsReceived.length > 0 ? (
                    <>
                        {transactionsReceived.slice(0, showMoreReceived ? transactionsReceived.length : 2).map((transaction) => (
                            <div key={transaction._id} className="mb-2 p-2 border rounded-md shadow-sm">
                                <p><strong>From:</strong> {transaction.userId.userName}</p>
                                <p><strong>Amount:</strong> ${transaction.amount}</p>
                                <p><strong>Status:</strong> {transaction.status}</p>
                                <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                        <button 
                            onClick={() => setShowMoreReceived(!showMoreReceived)} 
                            className="text-blue-500 hover:underline mt-2"
                        >
                            {showMoreReceived ? "View Less" : "View More"}
                        </button>
                    </>
                ) : (
                    <p className="text-red-500">No transactions received.</p>
                )}
            </div>
        </div>
    );
}
