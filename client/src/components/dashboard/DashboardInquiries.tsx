import React, { useState } from "react";
import { Box, Typography, Stack, Button, Grid } from "@mui/material";
import InquiryItem from "../InquiryItem";
import { InquiryData, updateInquiryStatus } from "../../services/api";

interface Props {
  inquiries: InquiryData[];
  token: string | undefined;
  onRefresh: () => void;
}

const DashboardInquiries: React.FC<Props> = ({
  inquiries,
  token,
  onRefresh,
}) => {
  const [viewMode, setViewMode] = useState<"tasks" | "all">("tasks");

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateInquiryStatus(id, newStatus, token);
      onRefresh();
    } catch (error) {
      console.error("Status update failed");
    }
  };

  const displayedInquiries =
    viewMode === "tasks"
      ? inquiries.filter(
          (inq) => inq.status === "New" || inq.status === "Contacted"
        )
      : inquiries;

  return (
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
            <InquiryItem inquiry={inq} onStatusChange={handleStatusChange} />
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
  );
};

export default DashboardInquiries;
