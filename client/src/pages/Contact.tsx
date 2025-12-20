import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  const PHONE = import.meta.env.VITE_APP_PHONE;
  const EMAIL = import.meta.env.VITE_APP_EMAIL;
  const ADDRESS = import.meta.env.VITE_APP_ADDRESS;
  const MAP_LOCATION = import.meta.env.VITE_APP_MAP_LOCATION;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Get in Touch
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mb={6}
      >
        Have questions? We are available 24/7 to assist you.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Call Us</Typography>
                <Typography variant="body1">{PHONE}</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
              <EmailIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Email Us</Typography>
                <Typography variant="body1">{EMAIL}</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
              <MapIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Visit Us</Typography>
                <Typography variant="body1">{ADDRESS}</Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              height: "100%",
              minHeight: 300,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <iframe
              src={MAP_LOCATION}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

import { Stack } from "@mui/material";

export default Contact;
