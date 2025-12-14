import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { sendInquiry } from "../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  routeInfo: string; // "Surat to Mumbai"
}

const BookingDialog: React.FC<Props> = ({ open, onClose, routeInfo }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    message: "",
    journeyDate: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async () => {
    try {
      await sendInquiry({ ...form, routeInfo });
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setForm({ name: "", mobile: "", message: "", journeyDate: "" });
      }, 2000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Book Your Trip</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom color="text.secondary">
          Inquiring for: <strong>{routeInfo}</strong>
        </Typography>

        {status === "success" && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Request Sent! We will call you shortly.
          </Alert>
        )}
        {status === "error" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to send. Try again.
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Mobile Number"
          fullWidth
          type="tel"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Journey Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={form.journeyDate}
          onChange={(e) => setForm({ ...form, journeyDate: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Message (Optional)"
          fullWidth
          multiline
          rows={2}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={status === "success"}
        >
          Send Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
