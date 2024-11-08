import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LikeButton } from './Like';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Typography, Box, Button, Chip, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {likeCountFamily} from "../store/like"
import { useSetRecoilState } from 'recoil';

export function PostCard({ name, title, description, id, likeCount }) {

  
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 
  const setLikeCount = useSetRecoilState( likeCountFamily(id));
  useEffect(()=>{
    setLikeCount(likeCount);
  }, [])
  
  
  
  
 

  // Function to toggle between full and short description
  const toggleDescription = () => {
    if (!token) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  // Handle click on the post title to check for login status
  const handlePostClick = (e) => {
    if (!token) {
      e.preventDefault();
      toast.warn("Please log in to view the full post!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      
      navigate(`/full-post/${id}`);

    }
  };

  // Limit the description to 100 characters if not expanded
  const shortDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
      <CardContent>
        <Link to={`/full-post/${id}`} onClick={handlePostClick} style={{ textDecoration: 'none' }}>
          <Typography variant="h5" component="h2" fontWeight="bold" color="text.primary" gutterBottom>
            {title}
          </Typography>
       

        {/* Description with "Read More/Less" toggle */}
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
          {isExpanded ? description : shortDescription}
          {description.length > 100 && (
            <Tooltip title={isExpanded ? "Read less" : "Read more"} arrow>
              <Button
                onClick={toggleDescription}
                size="small"
                color="primary"
                sx={{
                  textTransform: 'none',
                  padding: '0 8px',
                  fontWeight: 'medium',
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                }}
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {isExpanded ? 'Read Less' : 'Read More'}
              </Button>
            </Tooltip>
          )}
        </Typography>
        </Link>

        {/* Like Button */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <LikeButton postId={id} likeCounts = {likeCount}/>

          <Chip
            label={`Posted by: ${name}`}
            color="primary"
            variant="outlined"
            sx={{ fontSize: '0.875rem', fontWeight: '500' }}
          />
        </Box>
      </CardContent>

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </Card>
  );
}
