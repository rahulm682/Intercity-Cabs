import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Rating, Typography, Alert, Box 
} from '@mui/material';
import { createFeedback } from '../services/api';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FeedbackDialog: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!form.name || !form.comment) return;
    
    try {
      await createFeedback(form);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setForm({ name: '', rating: 5, comment: '' }); // Reset
      }, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Rate Your Experience</DialogTitle>
      <DialogContent>
        {status === 'success' ? (
          <Alert severity="success" sx={{ mt: 1 }}>
            Thanks! Your review is pending approval.
          </Alert>
        ) : (
          <>
            {status === 'error' && <Alert severity="error" sx={{ mb: 2 }}>Submission failed.</Alert>}
            
            <Box display="flex" flexDirection="column" alignItems="center" my={2}>
              <Typography component="legend">Tap to Rate</Typography>
              <Rating
                name="simple-controlled"
                value={form.rating}
                size="large"
                onChange={(_, newValue) => {
                  setForm({ ...form, rating: newValue || 5 });
                }}
              />
            </Box>

            <TextField
              autoFocus
              margin="dense"
              label="Your Name"
              fullWidth
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
            
            <TextField
              margin="dense"
              label="Share your experience..."
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={form.comment}
              onChange={(e) => setForm({...form, comment: e.target.value})}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {status !== 'success' && (
          <>
            <Button onClick={onClose} color="inherit">Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit Review
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;