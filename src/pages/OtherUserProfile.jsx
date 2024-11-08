import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OtherProfilePostCard } from '../components/OtherProfilePostCard'; 
import { useParams } from 'react-router';
import { Typography, Box, Button, Container, Grid, Paper } from '@mui/material';
import LoadingSpinner from '../components/Loading';

const BASE_URL = import.meta.env.VITE_API_URL;

export function OtherUserProfile() {
  const [posts, setPosts] = useState([]);
  const [userName, setUsername] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("token");
  const [myId, setMyId] = useState();
  const { userId } = useParams();
  const [authorId, setAuthorId] = useState("")
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.post(
          `${BASE_URL}/user/otherUser`,
          { userId },
          {
            headers: {
              Authorization: token
            }
          }
        );
      
        
        setIsFollowing(userResponse.data.follow);
        setAuthorId(userResponse.data.userDetails._id);
        setMyId(userResponse.data.followerId);
        setUsername(userResponse.data.userDetails.userName);
        setPosts(userResponse.data.postDetails);
        setFollowersCount(userResponse.data.userDetails.followerCount);
        setFollowingCount(userResponse.data.userDetails.followingCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId, token, isFollowing]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${userId}/follow`,
        { followerId: myId },
        {
          headers: {
            Authorization: token
          }
        }
      );
      setIsFollowing(response.data.follow);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  if(loading)
  {
    return(<LoadingSpinner />)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          {userName}'s Profile
        </Typography>
        <Box display="flex" gap={3}>
          <Button
            onClick={handleFollow}
            variant="contained"
            color={isFollowing ? 'error' : 'primary'}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="medium">
              {followersCount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="medium">
              {followingCount}
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
                <OtherProfilePostCard
                  postId={post._id}
                  title={post.title}
                  description={post.description}
                  createdAt={post.createdAt}
                  authorId = {authorId}
                  
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
