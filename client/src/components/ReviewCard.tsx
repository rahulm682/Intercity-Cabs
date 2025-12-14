import React from 'react';
import { Paper, Typography, Rating, Box, Avatar, Stack } from '@mui/material';

interface Props {
  feedback: { name: string; rating: number; comment: string };
}

const ReviewCard: React.FC<Props> = ({ feedback }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%', borderRadius: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>{feedback.name.charAt(0)}</Avatar>
        <Box>
            <Typography fontWeight="bold">{feedback.name}</Typography>
            <Rating value={feedback.rating} readOnly size="small" />
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        "{feedback.comment}"
      </Typography>
    </Paper>
  );
};

export default ReviewCard;