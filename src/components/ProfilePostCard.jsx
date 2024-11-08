import React, { useState } from 'react';
import { DeletePost } from './DeletePost';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

export function ProfilePostCard({ id, title, description, createdAt, token, flag, setFlag }) {
  const [isExpanded, setIsExpanded] = useState(false);
  


  const shortDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {isExpanded ? description : shortDescription}
          {description.length > 100 && (
            <Button onClick={toggleDescription} size="small" color="secondary" sx={{ ml: 1 }}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Button>
          )}
        </Typography>

        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            {createdAt ? `Created on: ${new Date(createdAt).toLocaleDateString()}` : ''}
          </Typography>
          
          {/* Delete Post Button */}
          <Box>
            <DeletePost postId={id} token={token} setFlag={setFlag} flag={flag} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
