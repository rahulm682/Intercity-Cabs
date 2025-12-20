import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  CardMedia,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { RouteData } from "../services/api";

interface Props {
  route: RouteData;
  onBook: () => void;
}

const getCarImage = (type: string) => {
  const normalizedType = type.toLowerCase();
  if (normalizedType.includes("suv")) {
    return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80";
  } else if (normalizedType.includes("luxury")) {
    return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80";
  } else {
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80";
  }
};

const RouteCard: React.FC<Props> = ({ route, onBook }) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 10 },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={getCarImage(route.vehicleType)}
          alt={route.vehicleType}
          sx={{ objectFit: "cover" }}
        />

        {!route.isAvailable && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            SOLD OUT
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {route.source}
          </Typography>
          <ArrowForwardIcon color="action" fontSize="small" />
          <Typography variant="h6" fontWeight="bold">
            {route.destination}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} mb={2}>
          <Chip
            icon={<LocalTaxiIcon />}
            label={route.vehicleType}
            size="small"
            sx={{ bgcolor: "#e3f2fd", color: "#1565c0", fontWeight: "bold" }}
          />
          <Chip
            icon={<AcUnitIcon />}
            label="AC"
            size="small"
            variant="outlined"
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          sx={{ minHeight: 40 }}
        >
          {route.description ||
            "Reliable intercity transport with experienced drivers."}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            pt: 2,
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              One Way Price
            </Typography>
            <Typography variant="h5" color="primary.main" fontWeight="bold">
              ₹{route.price}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onBook}
            disabled={!route.isAvailable}
            sx={{ px: 3, borderRadius: 2 }}
          >
            {route.isAvailable ? "Book" : "Full"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
