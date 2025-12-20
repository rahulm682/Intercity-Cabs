import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = import.meta.env.VITE_APP_PHONE;
    const message = "Hello! I am interested in booking a cab.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Fab color="success" aria-label="whatsapp" onClick={handleClick}>
      <WhatsAppIcon sx={{ fontSize: 32 }} />
    </Fab>
  );
};

export default WhatsAppButton;
