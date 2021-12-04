import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LocalMallTwoToneIcon from "@material-ui/icons/LocalMallTwoTone";
const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar is-link has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand flex-start">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo-white.png"
              width="112"
              height="28"
            />
          </a>
        </div>
        <Box
          display="flex"
          alignItems="center"
          marginLeft="auto"
          paddingRight="20px"
        >
          <NavLink
            to={"/dashboard"}
            exact
            style={{ color: "white", textDecoration: "none" }}
            activeStyle={{ color: "red", textDecoration: "none" }}
          >
            <LocalMallTwoToneIcon fontSize="large" />
            <Typography fontSize={2}>Dashboard</Typography>
          </NavLink>
        </Box>
      </nav>
    </div>
  );
};

export default Navbar;
