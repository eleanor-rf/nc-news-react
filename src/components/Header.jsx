import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Typography variant="h2">NC News</Typography>
      <div>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}

export default Header;
