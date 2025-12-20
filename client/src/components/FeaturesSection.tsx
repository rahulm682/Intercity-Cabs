import { Box, Grid, Typography, Paper, Container } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SavingsIcon from "@mui/icons-material/Savings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
    title: "Safe & Secure",
    desc: "Verified drivers and sanitized vehicles for your safety.",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
    title: "On-Time Pickup",
    desc: "Punctuality is our priority. We value your time.",
  },
  {
    icon: <SavingsIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
    title: "Best Prices",
    desc: "Transparent pricing with no hidden charges or toll surprises.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#1976d2" }} />,
    title: "24/7 Support",
    desc: "Our team is always available to assist you on your journey.",
  },
];

const TITLE = import.meta.env.VITE_APP_TITLE;

const FeaturesSection = () => {
  return (
    <Box sx={{ bgcolor: "#fff", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6}>
          Why Choose {TITLE}?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  bgcolor: "#f4f6f8",
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    bgcolor: "#e3f2fd",
                  },
                }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
