import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfilePostCard } from '../components/ProfilePostCard'; 
import { Typography, Box, Grid, Container, Paper } from '@mui/material';

const BASE_URL = import.meta.env.VITE_API_URL;

export function Profile() {
  const [posts, setPosts] = useState([]);
  const [flag, setFlag] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/user-posts`, {
          headers: {
            Authorization: token
          }
        });
        
        setPosts(userResponse.data.db.length > 0 ? userResponse.data.db : []);
        setUserDetails(userResponse.data.userDetails);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [flag, userDetails.followerCount, userDetails.followingCount]);

  if (!token) {
    return <Typography variant="h4" align="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          {userDetails.userName}'s Profile
        </Typography>
        <Box display="flex" gap={3}>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="medium">
              {userDetails.followerCount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="medium">
              {userDetails.followingCount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Following
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h6" color="textSecondary">
        Posts Created: {posts.length}
      </Typography>

      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          All Posts:
        </Typography>
        <Grid container spacing={2}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid item xs={12} key={post._id}>
                <ProfilePostCard 
                  flag={flag} 
                  setFlag={setFlag} 
                  token={token} 
                  id={post._id} 
                  title={post.title} 
                  description={post.description} 
                  createdAt={post.createdAt} 
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No posts created by this user.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
