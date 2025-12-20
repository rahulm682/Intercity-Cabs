import React from "react";
import {
  Paper,
  Box,
  Typography,
  Stack,
  Chip,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { InquiryData } from "../services/api";

interface Props {
  inquiry: InquiryData;
  onStatusChange: (id: string, newStatus: string) => void;
}

const statusColors: any = {
  New: "info", // Blue
  Contacted: "warning", // Orange
  Booked: "success", // Green
  Cancelled: "error", // Red
};

const InquiryItem: React.FC<Props> = ({ inquiry, onStatusChange }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        borderLeft: `6px solid`,
        borderColor: `${statusColors[inquiry.status]}.main`,
        transition: "0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {inquiry.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            color="text.secondary"
          >
            <PhoneIcon fontSize="small" sx={{ fontSize: 16 }} />
            <Typography variant="body2">{inquiry.mobile}</Typography>
          </Stack>
        </Box>

        <FormControl variant="standard" size="small" sx={{ minWidth: 110 }}>
          <Select
            value={inquiry.status || "New"}
            onChange={(e) => onStatusChange(inquiry._id, e.target.value)}
            disableUnderline
            sx={{
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: `${statusColors[inquiry.status]}.main`,
              textAlign: "right",
            }}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box mb={1.5} display="flex" gap={1} flexWrap="wrap">
        <Chip label={inquiry.routeInfo} size="small" variant="outlined" />
        {inquiry.journeyDate && (
          <Chip
            icon={<CalendarTodayIcon />}
            label={new Date(inquiry.journeyDate).toLocaleDateString()}
            size="small"
            color="primary"
            sx={{ bgcolor: "#e3f2fd", color: "#1565c0", fontWeight: "bold" }}
          />
        )}
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        color="text.secondary"
        mb={1}
      >
        <AccessTimeIcon fontSize="small" sx={{ fontSize: 16 }} />
        <Typography variant="caption">
          Received: {new Date(inquiry.createdAt).toLocaleString()}
        </Typography>
      </Stack>

      {inquiry.message && (
        <Box bgcolor="#f9fafb" p={1.5} borderRadius={2} border="1px solid #eee">
          <Typography variant="body2" fontStyle="italic" color="text.primary">
            "{inquiry.message}"
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default InquiryItem;
