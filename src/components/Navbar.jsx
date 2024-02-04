import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import LogoLight from "../images/logo-light.png";

import { AuthContext } from "../contexts";
import { ROLE } from "../constants";
import { getNameInitial, roleToName, getFullName } from "../utils/helpers";
import LogoutButton from "../features/auths/LogoutButton";
import { Heading } from "../ui/Typography";
import { ProfileImage } from "../ui/ProfileImage";

const adminPages = [{ name: "Users", url: "/users" }];

const staffPages = [
  { name: "Tickets", url: "/tickets" },
  { name: "Knowledges", url: "/knowledges" },
  { name: "Training Data", url: "/training" },
];

const studentPages = [
  { name: "Chatbot", url: "/chatbot" },
  { name: "Tickets", url: "/tickets" },
];

const SidebarContainer = styled.div`
  height: 100%;
  width: 310px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background-color: var(--color-primary-darker);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarLink = styled.div`
  font-family: "Playfair Display";
  padding: 15px 40px;
  margin: 0;
  font-size: 25px;
  width: 100%;
  color: var(--color-white);
  transition: 0.3s;

  &:hover {
    background-color: var(--color-primary);
  }

  ${({ isactive }) =>
    isactive &&
    css`
      background-color: var(--color-primary);
    `}
`;

const SidebarHome = styled.div`
  padding: 20px;
`;

const SidebarEnd = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const SidebarProfile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const getRoleBasedNav = () => {
    switch (auth.role) {
      case ROLE.admin:
        return adminPages;
      case ROLE.staff:
        return staffPages;
      case ROLE.student:
        return studentPages;
      default:
        return [];
    }
  };

  const renderNavLink = (links) => {
    return links?.map((link) => (
      <NavLink
        key={link.name}
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          height: "63px",
        }}
        to={link.url}
      >
        {({ isActive }) => (
          <SidebarLink isactive={isActive ? true : false}>
            {link.name}
          </SidebarLink>
        )}
      </NavLink>
    ));
  };

  return (
    <>
      <SidebarContainer>
        <div>
          <SidebarHome>
            <NavLink to="/">
              <img src={LogoLight} alt="sidebar logo" />
            </NavLink>
          </SidebarHome>

          {renderNavLink(getRoleBasedNav())}
        </div>

        <SidebarEnd>
          <SidebarProfile onClick={() => navigate(`/profile`)}>
            <ProfileImage>
              {getNameInitial(getFullName(auth?.firstName, auth?.lastName))}
            </ProfileImage>
            <div>
              <Heading as="h3" style={{ color: "white", fontWeight: "bold" }}>
                {getFullName(auth?.firstName, auth?.lastName)}
              </Heading>
              <Heading as="h5" style={{ color: "white" }}>
                {roleToName(auth.role)}
              </Heading>
            </div>
          </SidebarProfile>

          <LogoutButton />
        </SidebarEnd>
      </SidebarContainer>
    </>
  );
};

export default Navbar;
