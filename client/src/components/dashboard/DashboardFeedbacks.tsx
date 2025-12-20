import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Rating,
  Stack,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FeedbackData,
  toggleFeedbackStatus,
  deleteFeedback,
} from "../../services/api";

interface Props {
  feedbacks: FeedbackData[];
  token: string | undefined;
  onRefresh: () => void;
}

const DashboardFeedbacks: React.FC<Props> = ({
  feedbacks,
  token,
  onRefresh,
}) => {
  const handleToggleFeedback = async (id: string, currentStatus: boolean) => {
    if (!token) return;
    try {
      await toggleFeedbackStatus(id, !currentStatus, token);
      onRefresh();
    } catch (err) {
      alert("Failed to update");
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm("Delete this review permanently?")) return;
    if (token) {
      await deleteFeedback(id, token);
      onRefresh();
    }
  };

  return (
    <Grid container spacing={2}>
      {feedbacks.map((fb) => (
        <Grid size={{ xs: 12, sm: 6 }} key={fb._id}>
          <Paper
            sx={{
              p: 2,
              border: fb.isApproved ? "1px solid #4caf50" : "1px solid #ff9800",
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
                <Stack direction="row" alignItems="center" color="success.main">
                  <CheckCircleIcon fontSize="small" />{" "}
                  <Typography variant="caption" ml={0.5}>
                    Live
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" color="warning.main">
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
                    onChange={() => handleToggleFeedback(fb._id, fb.isApproved)}
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
          No reviews yet.
        </Typography>
      )}
    </Grid>
  );
};

export default DashboardFeedbacks;
