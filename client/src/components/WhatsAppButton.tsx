import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const handleClick = () => {
    // Replace with your actual mobile number
    const phoneNumber = "919876543210"; 
    const message = "Hello! I am interested in booking a cab.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Fab 
      color="success" 
      aria-label="whatsapp"
      onClick={handleClick}
    >
      <WhatsAppIcon sx={{ fontSize: 32 }} />
    </Fab>
  );
};

export default WhatsAppButton;