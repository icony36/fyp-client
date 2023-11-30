import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const pages = [
  { name: "Knowledges", link: "/knowledges" },
  { name: "Tickets", link: "/tickets" },
  { name: "Profile", link: "/profile" },
  { name: "All Users", linke: "/users" },
  { name: "Create User", linke: "/users/new" },
  { name: "Login", linke: "/login" },
];

const Navbar = () => {
  return (
    <AppBar className="navbar" position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <SmartToyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "900",
                }}
              >
                <NavLink to={page.link}>{page.name}</NavLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
