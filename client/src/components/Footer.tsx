import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Fab,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppButton from "./WhatsAppButton";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a202c", color: "white", py: 6, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Intercity Cabs
            </Typography>
            <Typography variant="body2" color="grey.400">
              Your trusted partner for comfortable intercity travel between
              Surat, Mumbai, Ahmedabad and across India.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
              <Link href="/login" color="inherit" underline="hover">
                Admin Login
              </Link>
            </Stack>
          </Grid>

          {/* Column 3: Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="grey.400">
              📍 Aman society, Maroli Bazar, Ponsara Road, Navsari - 396436
            </Typography>
            <Typography variant="body2" color="grey.400">
              📞 +91 98765 43210
            </Typography>

            <Box mt={2}>
              <Fab color="success" aria-label="facebook">
                <IconButton color="inherit">
                  <FacebookIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Fab>
              <Fab color="success" aria-label="instagram">
                <IconButton color="inherit">
                  <InstagramIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Fab>
              <WhatsAppButton />
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="grey.600"
          align="center"
          sx={{ mt: 5 }}
        >
          © {new Date().getFullYear()} Intercity Cabs. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
