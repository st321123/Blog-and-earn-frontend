import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Superchat } from './Superchat';

export function OtherProfilePostCard({ postId, title, description, createdAt,authorId }) {
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

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
{createdAt && (
  <Typography variant="body2" color="textSecondary">
    Created on: {new Date(createdAt).toLocaleDateString()}
  </Typography>
)}

{/* Superchat Component on the Right */}
<Box display="flex" alignItems="center">
  <Superchat postId={postId} recipientId={authorId} />
  {/* Replace ChatIcon with your preferred icon */}
</Box>
</Box>



    
      </CardContent>
    </Card>
  );
}
