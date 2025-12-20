import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const TITLE = import.meta.env.VITE_APP_TITLE || "AQSA Tours and Travels";
  const auth = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => {
    setAnchorElNav(null);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    auth?.logout();
    handleCloseNavMenu("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {" "}
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={() => handleCloseNavMenu("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu("/contact")}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
              {auth?.user && (
                <MenuItem
                  onClick={() => handleCloseNavMenu("/admin/dashboard")}
                >
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <DirectionsCarIcon
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              mr: 2,
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {TITLE}
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth?.user ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/admin/dashboard")}
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleLogout}
                  sx={{ ml: 1, borderColor: "rgba(255,255,255,0.5)" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Admin Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
