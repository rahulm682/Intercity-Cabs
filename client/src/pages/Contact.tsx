import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
        Get in Touch
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={6}>
        Have questions? We are available 24/7 to assist you.
      </Typography>

      <Grid container spacing={4}>
        {/* Info Cards */}
        <Grid size={{xs:12, md: 6}}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <PhoneIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Call Us</Typography>
                <Typography variant="body1">+91 98765 43210</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmailIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Email Us</Typography>
                <Typography variant="body1">booking@smcabs.com</Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MapIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="h6">Visit Us</Typography>
                <Typography variant="body1">Aman society, Maroli Bazar, Ponsara Road, Navsari</Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>

        {/* Embedded Map (Google Maps Embed) */}
        <Grid size={{xs:12, md: 6}}>
          <Paper sx={{ height: '100%', minHeight: 300, overflow: 'hidden', borderRadius: 2 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1862.0877761390675!2d72.8899981!3d21.0256606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be057cd86100c3f%3A0x232304739554d7c5!2sAQSA%20TRAVEL%20NAVSARI!5e0!3m2!1sen!2sin!4v1765703378592!5m2!1sen!2sin" width="100%" 
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

// Helper for Stack
import { Stack } from '@mui/material';

export default Contact;