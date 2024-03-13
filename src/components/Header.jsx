import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function Header() {
  return (
    <>
      <Typography variant="h2">NC News 🗞️🐕</Typography>
      <Box mb={2}>
        <Link to="/" style={{ marginRight: "15px" }}>
          Home
        </Link>
        <Link to="/topics" style={{ marginRight: "15px" }}>
          All topics
        </Link>
      </Box>
    </>
  );
}

export default Header;
