import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Typography,
  Toolbar,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { AuthContext } from "../contexts";
import { ROLE } from "../constants";
import LogoutButton from "./LogoutButton";

const pages = [
  { name: "Knowledges", link: "/knowledges" },
  { name: "Tickets", link: "/tickets" },
  { name: "Profile", link: "/profile" },
  { name: "All Users", link: "/users" },
  { name: "Create User", link: "/users/new" },
];

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <AppBar className="navbar" position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <SmartToyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </NavLink>
          {auth.isAuth ? (
            <>
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
              <LogoutButton />
            </>
          ) : (
            <Typography sx={{ fontWeight: "900" }}>
              Student Service Chatbot
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
