import React, { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';

export function Superchat({ postId, recipientId, senderId }) {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState("success"); // 'success' or 'error'
    const BASE_URL = import.meta.env.VITE_API_URL;
 
    const token = localStorage.getItem("token");
    
    async function handleSuperChat() {
        // Check if the sender is trying to send money to themselves
        if (senderId === recipientId) {
            const errorMsg = "You cannot send money to yourself.";
            setErr(errorMsg);
            setMessage(errorMsg);
            setSnackbarType("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            // Validate the amount input
            if (!amount || isNaN(amount) || amount <= 0) {
                const validationMsg = "Please enter a valid amount.";
                setMessage(validationMsg);
                setSnackbarType("error");
                setOpenSnackbar(true);
                return;
            }

            // Sending the Superchat request to the backend
            const response = await axios.post(
                `${BASE_URL}/${postId}/transfer`,
                { recipientId, amount: parseFloat(amount) },
                { headers: { Authorization: token } }
            );

            // Set success message from backend response
            setMessage(response.data.message);
            setErr(""); // Clear any previous error message
            setAmount(''); // Reset the amount input

            // Show success Snackbar notification
            setSnackbarType("success");
            setOpenSnackbar(true);
        } catch (error) {
            // Handle errors and display backend message if available
            const errorMessage = error.response?.data?.message || "Transaction failed";
            setErr(errorMessage); // Set error message from backend
            console.error("Error sending Superchat:", error);
            setMessage(errorMessage); // Update message to show the error

            // Show error Snackbar notification
            setSnackbarType("error");
            setOpenSnackbar(true);
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Superchat Button */}
            <Button
                variant="contained"
                color="success"
                onClick={() => setShow(true)}
                sx={{ fontWeight: 'bold' }}
            >
                💬 Superchat
            </Button>

            {/* Superchat Dialog */}
            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogTitle>Send a Superchat</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        inputProps={{ min: 0 }}
                        error={!!err} // Display error styling if err exists
                        helperText={err} // Show error message if available
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShow(false)} color="secondary" variant="outlined">
                        Close
                    </Button>
                    <Button onClick={handleSuperChat} color="primary" variant="contained">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarType} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
