import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Alert,
  Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  format,
  addDays,
  isSameDay,
  eachDayOfInterval,
  parseISO,
  startOfToday,
} from "date-fns";
import { InquiryData } from "../../services/api";

interface Props {
  inquiries: InquiryData[];
}

const DashboardSchedule: React.FC<Props> = ({ inquiries }) => {
  const [dateRange, setDateRange] = useState({
    start: format(startOfToday(), "yyyy-MM-dd"),
    end: format(addDays(startOfToday(), 6), "yyyy-MM-dd"),
  });

  let calendarDays: Date[] = [];
  try {
    calendarDays = eachDayOfInterval({
      start: parseISO(dateRange.start),
      end: parseISO(dateRange.end),
    });
  } catch (e) {
    calendarDays = [];
  }

  const getBookingsForDate = (date: Date) => {
    return inquiries.filter(
      (i) =>
        i.journeyDate &&
        i.status === "Booked" &&
        isSameDay(new Date(i.journeyDate), date)
    );
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonthIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Trip Schedule
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <TextField
              label="Start Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </Grid>

          <Grid size="auto" sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="body2" color="text.secondary">
              to
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <TextField
              label="End Date"
              type="date"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }} sx={{ ml: { md: "auto" } }}>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              onClick={() =>
                setDateRange({
                  start: format(startOfToday(), "yyyy-MM-dd"),
                  end: format(addDays(startOfToday(), 6), "yyyy-MM-dd"),
                })
              }
            >
              Reset Week
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {calendarDays.length > 0 ? (
        <Grid container spacing={2}>
          {calendarDays.map((date) => {
            const daysBookings = getBookingsForDate(date);
            const isToday = isSameDay(date, new Date());
            const isPast = date < startOfToday();
            return (
              <Grid size={{ xs: 12, sm: 6, md: 1.7 }} key={date.toISOString()}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: isToday ? "#e3f2fd" : isPast ? "#f5f5f5" : "white",
                    border: isToday ? "2px solid #1976d2" : "1px solid #eee",
                    opacity: isPast && daysBookings.length === 0 ? 0.6 : 1,
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
                  {daysBookings.length > 0 ? (
                    <Box mt={1}>
                      <Chip
                        label={`${daysBookings.length} Trips`}
                        color={isPast ? "default" : "success"}
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
  );
};

export default DashboardSchedule;
