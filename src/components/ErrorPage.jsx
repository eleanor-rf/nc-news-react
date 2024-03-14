import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state ? location.state.message : "Unknown Error";

  useEffect(() => {
    if (errorMessage === "Unknown Error") {
      navigate("/");
    }
  }, [errorMessage]);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "50dvh",
      }}
    >
      <Typography variant="h2">4️⃣0️⃣4️⃣</Typography>
      <Typography variant="h4">{errorMessage}</Typography>
    </Box>
  );
}

export default ErrorPage;
