import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  RouteData,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../../services/api";

interface Props {
  routes: RouteData[];
  token: string | undefined;
  onRefresh: () => void;
}

const DashboardRoutes: React.FC<Props> = ({ routes, token, onRefresh }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    price: "",
    vehicleType: "Sedan",
    description: "",
    isAvailable: true,
  });

  const handleEditClick = (route: RouteData) => {
    setEditId(route._id);
    setForm({
      source: route.source,
      destination: route.destination,
      price: route.price.toString(),
      vehicleType: route.vehicleType,
      description: route.description,
      isAvailable: route.isAvailable,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({
      source: "",
      destination: "",
      price: "",
      vehicleType: "Sedan",
      description: "",
      isAvailable: true,
    });
  };

  const handleSubmitRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editId) {
        await updateRoute(
          editId,
          { ...form, price: Number(form.price) },
          token
        );
        setMsg({ type: "success", text: "Route Updated!" });
      } else {
        await createRoute({ ...form, price: Number(form.price) } as any, token);
        setMsg({ type: "success", text: "Route Created!" });
      }
      handleCancelEdit();
      onRefresh();
    } catch (error) {
      setMsg({ type: "error", text: "Operation failed." });
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (!window.confirm("Delete this route?")) return;
    if (token) {
      await deleteRoute(id, token);
      onRefresh();
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              {editId ? "Edit Route" : "Add New Route"}
            </Typography>
            {editId && (
              <Button size="small" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </Box>
          {msg && (
            <Alert
              severity={msg.type}
              onClose={() => setMsg(null)}
              sx={{ mb: 2 }}
            >
              {msg.text}
            </Alert>
          )}

          <Stack spacing={2} component="form" onSubmit={handleSubmitRoute}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Source"
                fullWidth
                size="small"
                required
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
              <TextField
                label="Destination"
                fullWidth
                size="small"
                required
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
              />
            </Stack>
            <TextField
              label="Price (₹)"
              type="number"
              fullWidth
              size="small"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <TextField
              select
              label="Vehicle Type"
              fullWidth
              size="small"
              value={form.vehicleType}
              onChange={(e) =>
                setForm({ ...form, vehicleType: e.target.value })
              }
            >
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </TextField>
            <TextField
              label="Description"
              multiline
              rows={2}
              fullWidth
              size="small"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color={editId ? "warning" : "primary"}
            >
              {editId ? "Update Route" : "Add Route"}
            </Button>
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 7 }}>
        <Stack spacing={2}>
          {routes.map((route) => (
            <Paper
              key={route._id}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {route.source} ➝ {route.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {route.vehicleType} • ₹{route.price}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(route)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteRoute(route._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DashboardRoutes;
