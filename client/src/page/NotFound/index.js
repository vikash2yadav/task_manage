import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "5rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ margin: "1rem 0" }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      {/* <Button
        variant="contained"
        component={Link}
        to="/" // Adjust the path to redirect to
        sx={{ minWidth: "10rem" }}
      >
        Go to Dashboard
      </Button> */}
    </Box>
  );
};

export default NotFound;
