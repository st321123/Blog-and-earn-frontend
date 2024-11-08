// DeletePost.js
import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

export  function DeletePost({ postId, token, setFlag, flag }) {
  const [open, setOpen] = useState(false);
  
  const BASE_URL = import.meta.env.VITE_API_URL;
 

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the post
      const response = await axios.delete(`${BASE_URL}/${postId}/delete`, {
        headers: { Authorization: token }
      });

      if (response.status === 200) {
        toast.success("Post deleted successfully!", { position: "top-right" });
         // Update the parent component state to reflect the change
      } else {
        throw new Error("Failed to delete post.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.", { position: "top-right" });
    } finally {
      setOpen(false); // Close the dialog after attempting delete
    }
    
    setFlag(!flag);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    
      <IconButton onClick={handleClickOpen} color="error">
        <DeleteIcon />
      </IconButton>

      {/* Dialog to confirm deletion */}
     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
    </Dialog>  
    </>
  );
}
