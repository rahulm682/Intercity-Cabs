// src/pages/AdminDashboard.tsx
import { useState } from "react";
import { Button, TextField, Typography, Stack, Paper } from "@mui/material";

const AdminAddRoute = () => {
  // Simple state for demo. Use Formik for production forms.
  const [form, setForm] = useState({ source: "", destination: "", price: 0 });

  const handleSubmit = () => {
    // API Call: axios.post('/api/routes', form)
    console.log("Submitting:", form);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Add New Route
      </Typography>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Source (e.g. Surat)"
            fullWidth
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />
          <TextField
            label="Destination (e.g. Mumbai)"
            fullWidth
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
          />
        </Stack>
        <TextField
          label="Price"
          type="number"
          fullWidth
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <Button variant="contained" size="large" onClick={handleSubmit}>
          Create Route
        </Button>
      </Stack>
    </Paper>
  );
};

export default AdminAddRoute;
