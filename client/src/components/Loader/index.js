import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh", // Full viewport height
        textAlign: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 0 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
