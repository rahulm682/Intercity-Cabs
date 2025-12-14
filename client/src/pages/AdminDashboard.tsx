import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Paper,
  Stack,
  IconButton,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Rating,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  format,
  addDays,
  isSameDay,
  eachDayOfInterval,
  parseISO,
  startOfToday,
} from "date-fns";

import { AuthContext } from "../context/AuthContext";
import InquiryItem from "../components/InquiryItem"; // Ensure this component exists from previous steps
import {
  fetchRoutes,
  createRoute,
  deleteRoute,
  updateRoute,
  RouteData,
  fetchInquiries,
  fetchAllFeedbacks,
  toggleFeedbackStatus,
  deleteFeedback,
  FeedbackData,
  updateInquiryStatus,
  InquiryData,
} from "../services/api";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);

  // --- STATE MANAGEMENT ---
  const [tabValue, setTabValue] = useState(0); // 0=Routes, 1=Inquiries, 2=Feedback
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Route Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    source: "",
    destination: "",
    price: "",
    vehicleType: "Sedan",
    description: "",
    isAvailable: true,
  });
  const [viewMode, setViewMode] = useState<"tasks" | "all">("tasks");
  const [dateRange, setDateRange] = useState({
    start: format(startOfToday(), "yyyy-MM-dd"),
    end: format(addDays(startOfToday(), 6), "yyyy-MM-dd"),
  });

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  // const displayedInquiries = showRecentOnly
  //   ? inquiries.filter((inq) => new Date(inq.createdAt) >= tenDaysAgo)
  //   : inquiries;

  // --- INITIAL DATA LOAD ---
  useEffect(() => {
    loadAllData();
  }, [auth?.user?.token]);

  const loadAllData = async () => {
    // 1. Load Routes (Public - doesn't need token, but we are in admin)
    try {
      const routeData = await fetchRoutes();
      setRoutes(routeData);
    } catch (error) {
      console.error("Failed to load routes:", error);
    }

    // 2. Load Protected Data (Only if logged in)
    if (auth?.user?.token) {
      // Inquiries
      try {
        const inqData = await fetchInquiries(auth.user.token);
        setInquiries(inqData);
      } catch (error) {
        console.error("Failed to load inquiries. Check backend API.", error);
      }

      // Feedback
      try {
        const feedData = await fetchAllFeedbacks(auth.user.token);
        setFeedbacks(feedData);
      } catch (error) {
        console.error(
          "Failed to load feedback. Did you restart the backend?",
          error
        );
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (auth?.user?.token) {
      // Optimistic Update: Update UI immediately so it feels fast
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id ? { ...inq, status: newStatus as any } : inq
        )
      );

      try {
        // Call Backend
        await updateInquiryStatus(id, newStatus, auth.user.token);
      } catch (error) {
        console.error("Status update failed");
        loadAllData(); // Revert on error
      }
    }
  };

  const displayedInquiries =
    viewMode === "tasks"
      ? inquiries.filter(
          (inq) => inq.status === "New" || inq.status === "Contacted"
        ) // Hide Booked/Cancelled
      : inquiries; // Show everything

  // --- ROUTE HANDLERS ---
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
    setTabValue(0); // Switch to routes tab
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
    if (!auth?.user?.token) return;

    try {
      if (editId) {
        await updateRoute(
          editId,
          { ...form, price: Number(form.price) },
          auth.user.token
        );
        setMsg({ type: "success", text: "Route Updated!" });
      } else {
        await createRoute(
          { ...form, price: Number(form.price) } as any,
          auth.user.token
        );
        setMsg({ type: "success", text: "Route Created!" });
      }
      handleCancelEdit();
      loadAllData(); // Refresh list
    } catch (error) {
      setMsg({ type: "error", text: "Operation failed." });
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (!window.confirm("Delete this route?")) return;
    if (auth?.user?.token) {
      await deleteRoute(id, auth.user.token);
      setRoutes(routes.filter((r) => r._id !== id));
    }
  };

  // --- FEEDBACK HANDLERS ---
  const handleToggleFeedback = async (id: string, currentStatus: boolean) => {
    if (auth?.user?.token) {
      try {
        const updated = await toggleFeedbackStatus(
          id,
          !currentStatus,
          auth.user.token
        );
        // Update local state locally to avoid full reload
        setFeedbacks(
          feedbacks.map((f) =>
            f._id === id ? { ...f, isApproved: updated.isApproved } : f
          )
        );
      } catch (err) {
        alert("Failed to update status");
      }
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm("Delete this review permanently?")) return;
    if (auth?.user?.token) {
      await deleteFeedback(id, auth.user.token);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    }
  };

  // Generate array of dates based on range
  let calendarDays: Date[] = [];
  try {
    calendarDays = eachDayOfInterval({
      start: parseISO(dateRange.start),
      end: parseISO(dateRange.end),
    });
  } catch (e) {
    // If user types invalid dates, fallback to empty or safe default
    calendarDays = [];
  }

  // Helper to get bookings (same as before)
  const getBookingsForDate = (date: Date) => {
    return inquiries.filter(
      (i) =>
        i.journeyDate &&
        i.status === "Booked" &&
        isSameDay(new Date(i.journeyDate), date)
    );
  };

  return (
    <Container sx={{ mt: 4, mb: 8 }} maxWidth="lg">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Button variant="outlined" color="error" onClick={auth?.logout}>
          Logout
        </Button>
      </Box>

      {/* TABS NAVIGATION */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label={`Routes (${routes.length})`} />
          <Tab label={`Inquiries (${inquiries.length})`} />
          <Tab label={`Reviews (${feedbacks.length})`} />
          <Tab label={`Schedules`} />
        </Tabs>
      </Box>

      {msg && (
        <Alert severity={msg.type} sx={{ mb: 3 }} onClose={() => setMsg(null)}>
          {msg.text}
        </Alert>
      )}

      {/* --- TAB 1: ROUTES --- */}
      {tabValue === 0 && (
        <Grid container spacing={4}>
          {/* Add/Edit Form */}
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

              <Stack spacing={2} component="form" onSubmit={handleSubmitRoute}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Source"
                    fullWidth
                    size="small"
                    required
                    value={form.source}
                    onChange={(e) =>
                      setForm({ ...form, source: e.target.value })
                    }
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

          {/* Route List */}
          <Grid size={{ xs: 12, md: 7 }}>
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
      )}

      {/* --- TAB 2: INQUIRIES --- */}
      {tabValue === 1 && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="bold">
              Inquiry Management
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              bgcolor="#f5f5f5"
              p={0.5}
              borderRadius={2}
            >
              <Button
                variant={viewMode === "tasks" ? "contained" : "text"}
                onClick={() => setViewMode("tasks")}
                size="small"
                disableElevation
              >
                Pending Tasks
              </Button>
              <Button
                variant={viewMode === "all" ? "contained" : "text"}
                onClick={() => setViewMode("all")}
                size="small"
                disableElevation
              >
                All History
              </Button>
            </Stack>
          </Box>

          <Grid container spacing={2}>
            {displayedInquiries.map((inq) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={inq._id}>
                <InquiryItem
                  inquiry={inq}
                  onStatusChange={handleStatusChange}
                />
              </Grid>
            ))}

            {displayedInquiries.length === 0 && (
              <Box width="100%" textAlign="center" py={5}>
                <Typography variant="h6" color="text.secondary">
                  {viewMode === "tasks"
                    ? "🎉 All caught up! No pending inquiries."
                    : "No inquiries found."}
                </Typography>
              </Box>
            )}
          </Grid>
        </>
      )}

      {/* --- TAB 3: FEEDBACK MODERATION --- */}
      {tabValue === 2 && (
        <Grid container spacing={2}>
          {feedbacks.map((fb) => (
            <Grid size={{ xs: 12, sm: 6 }} key={fb._id}>
              <Paper
                sx={{
                  p: 2,
                  border: fb.isApproved
                    ? "1px solid #4caf50"
                    : "1px solid #ff9800",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography fontWeight="bold">{fb.name}</Typography>
                    <Rating value={fb.rating} readOnly size="small" />
                  </Box>
                  {fb.isApproved ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      color="success.main"
                    >
                      <CheckCircleIcon fontSize="small" />{" "}
                      <Typography variant="caption" ml={0.5}>
                        Live
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      alignItems="center"
                      color="warning.main"
                    >
                      <PendingIcon fontSize="small" />{" "}
                      <Typography variant="caption" ml={0.5}>
                        Hidden
                      </Typography>
                    </Stack>
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    my: 1,
                    fontStyle: "italic",
                    bgcolor: "#f5f5f5",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  "{fb.comment}"
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={fb.isApproved}
                        onChange={() =>
                          handleToggleFeedback(fb._id, fb.isApproved)
                        }
                        color="success"
                      />
                    }
                    label={fb.isApproved ? "Approved" : "Approve"}
                  />
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => handleDeleteFeedback(fb._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
          {feedbacks.length === 0 && (
            <Typography sx={{ p: 3, width: "100%", textAlign: "center" }}>
              No reviews submitted yet.
            </Typography>
          )}
        </Grid>
      )}

      {/* UPCOMING SCHEDULE SECTION */}
      {tabValue === 3 && (
        <Box>
          {/* 1. Date Range Toolbar */}
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mr: "auto" }}
            >
              <CalendarMonthIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Trip Schedule
              </Typography>
            </Stack>

            {/* Date Pickers */}
            <TextField
              label="Start Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <Typography variant="body2" color="text.secondary">
              to
            </Typography>
            <TextField
              label="End Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />

            {/* Quick Reset Button */}
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                setDateRange({
                  start: format(startOfToday(), "yyyy-MM-dd"),
                  end: format(addDays(startOfToday(), 6), "yyyy-MM-dd"),
                })
              }
            >
              Reset to This Week
            </Button>
          </Paper>

          {/* 2. The Calendar Grid */}
          {calendarDays.length > 0 ? (
            <Grid container spacing={2}>
              {calendarDays.map((date) => {
                const daysBookings = getBookingsForDate(date);
                const isToday = isSameDay(date, new Date());
                const isPast = date < startOfToday();

                return (
                  <Grid size={{xs:12, sm: 6, md: 1.7}} key={date.toISOString()}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: isToday
                          ? "#e3f2fd"
                          : isPast
                          ? "#f5f5f5"
                          : "white", // Gray out past days
                        border: isToday
                          ? "2px solid #1976d2"
                          : "1px solid #eee",
                        opacity: isPast && daysBookings.length === 0 ? 0.6 : 1, // Fade empty past days
                        minHeight: 120,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color={isPast ? "text.disabled" : "text.secondary"}
                        textTransform="uppercase"
                      >
                        {format(date, "EEE")}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color={isPast ? "text.secondary" : "text.primary"}
                      >
                        {format(date, "d")}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        mb={1}
                        color="text.secondary"
                      >
                        {format(date, "MMM yyyy")}
                      </Typography>

                      {/* Booking Dots/Count */}
                      {daysBookings.length > 0 ? (
                        <Box mt={1}>
                          <Chip
                            label={`${daysBookings.length} Trips`}
                            color={isPast ? "default" : "success"} // Gray chip for past trips
                            size="small"
                            sx={{ fontWeight: "bold" }}
                          />
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.disabled">
                          No Trips
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Alert severity="warning">Invalid Date Range selected.</Alert>
          )}
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;
