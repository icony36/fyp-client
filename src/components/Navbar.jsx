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
import LogoutButton from "../features/auths/LogoutButton";

const adminPages = [
  { name: "Users", link: "/users" },
  { name: "Profile", link: "/profile" },
];

const staffPages = [
  { name: "Tickets", link: "/tickets" },
  { name: "Knowledges", link: "/knowledges" },
  { name: "Training Data", link: "/training" },
  { name: "Profile", link: "/profile" },
];

const studentPages = [
  { name: "Chatbot", link: "/chatbot" },
  { name: "Profile", link: "/profile" },
];

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const renderRoleBasedNav = () => {
    switch (auth.role) {
      case ROLE.admin:
        return getNavLinks(adminPages);
      case ROLE.staff:
        return getNavLinks(staffPages);
      case ROLE.student:
        return getNavLinks(studentPages);
      default:
        return <></>;
    }
  };

  const getNavLinks = (arr) => {
    if (arr.length <= 0) return <></>;

    return arr.map((el) => (
      <Button
        key={el.name}
        sx={{ my: 2, color: "#bbdefb", display: "block", fontWeight: "900" }}
      >
        <NavLink to={el.link}>{el.name}</NavLink>
      </Button>
    ));
  };

  return (
    <AppBar className="navbar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <SmartToyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </NavLink>
          {auth.isAuth ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {renderRoleBasedNav()}
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
