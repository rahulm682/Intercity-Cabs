import { useContext, useEffect, useState } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

import {
  fetchRoutes,
  fetchInquiries,
  fetchAllFeedbacks,
  RouteData,
  InquiryData,
  FeedbackData,
} from "../services/api";
import DashboardRoutes from "../components/dashboard/DashboardRoutes";
import DashboardInquiries from "../components/dashboard/DashboardInquiries";
import DashboardFeedbacks from "../components/dashboard/DashboardFeedbacks";
import DashboardSchedule from "../components/dashboard/DashboardSchedule";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);

  const [tabValue, setTabValue] = useState(0);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);

  const loadAllData = async () => {
    try {
      setRoutes(await fetchRoutes());

      if (auth?.user?.token) {
        setInquiries(await fetchInquiries(auth.user.token));
        setFeedbacks(await fetchAllFeedbacks(auth.user.token));
      }
    } catch (error) {
      console.error("Dashboard data load failed", error);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [auth?.user?.token]);

  return (
    <Container sx={{ mt: 4, mb: 8 }} maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`Routes (${routes.length})`} />
          <Tab
            label={`Inquiries (${
              inquiries.filter((i) => i.status === "New").length
            })`}
          />
          <Tab label={`Reviews (${feedbacks.length})`} />
          <Tab label={`Schedules`} />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <DashboardRoutes
          routes={routes}
          token={auth?.user?.token}
          onRefresh={loadAllData}
        />
      )}

      {tabValue === 1 && (
        <DashboardInquiries
          inquiries={inquiries}
          token={auth?.user?.token}
          onRefresh={loadAllData}
        />
      )}

      {tabValue === 2 && (
        <DashboardFeedbacks
          feedbacks={feedbacks}
          token={auth?.user?.token}
          onRefresh={loadAllData}
        />
      )}

      {tabValue === 3 && <DashboardSchedule inquiries={inquiries} />}
    </Container>
  );
};

export default AdminDashboard;
