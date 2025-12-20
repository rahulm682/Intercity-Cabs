import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Alert,
  Box,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Helmet } from "react-helmet-async";
import { fetchRoutes, RouteData } from "../services/api";
import RouteCard from "../components/RouteCard";
import BookingDialog from "../components/BookingDialog";
import { fetchPublicFeedbacks, FeedbackData } from "../services/api";
import ReviewCard from "../components/ReviewCard";
import FeedbackDialog from "../components/FeedbackDialog";
import RouteSkeleton from "../components/RouteSkeleton";
import FeaturesSection from "../components/FeaturesSection";

const Home = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const TITLE = import.meta.env.VITE_APP_TITLE;

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data = await fetchRoutes();
        setRoutes(data);
      } catch (err) {
        setError("Failed to fetch routes. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
    fetchPublicFeedbacks().then(setFeedbacks);
  }, []);

  const handleBookClick = (route: RouteData) => {
    setSelectedRoute(
      `${route.source} to ${route.destination} (${route.vehicleType})`
    );
    setIsDialogOpen(true);
  };

  const displayedRoutes = routes.filter(
    (route) =>
      route.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>{TITLE} | Surat to Mumbai Taxi Service</title>
        <meta
          name="description"
          content="Book affordable one-way and round-trip cabs from Surat to Mumbai, Ahmedabad, and more. AC Sedans and SUVs available."
        />
      </Helmet>
      <Box mb={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom fontWeight="800">
          Premium Intercity Rides
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Safe, reliable, and comfortable trips across India.
        </Typography>
      </Box>

      {loading && (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={n}>
              <RouteSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Box maxWidth="sm" mx="auto" mb={6}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a city (e.g. Mumbai)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 5, bgcolor: "white", boxShadow: 1 },
          }}
        />
      </Box>

      {!loading && !error && (
        <>
          <Grid container spacing={3} mb={8}>
            {displayedRoutes.map((route) => (
              <Grid key={route._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <RouteCard
                  route={route}
                  onBook={() => handleBookClick(route)}
                />
              </Grid>
            ))}
          </Grid>

          <BookingDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            routeInfo={selectedRoute || ""}
          />
          <FeedbackDialog
            open={isFeedbackOpen}
            onClose={() => setIsFeedbackOpen(false)}
          />
        </>
      )}

      <Box mb={8}>
        <FeaturesSection />
      </Box>

      <Box mt={8} mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          What Our Customers Say
        </Typography>

        {feedbacks.length > 0 ? (
          <Grid container spacing={3} mt={2}>
            {feedbacks.map((fb) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={fb._id}>
                <ReviewCard feedback={fb} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No reviews yet. Be the first!
          </Typography>
        )}

        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setIsFeedbackOpen(true)}
          >
            Write a Review
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
