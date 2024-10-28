import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import moment from "moment";
import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import { useParams } from "react-router-dom";

const Form = () => {
  const params = useParams();
  const { module } = params;
  const { type } = useContext(CommonContext);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

        <Box flexGrow={1}></Box>
        <Typography
          display={{ xs: "none", lg: "block" }}
          color="rgba(0,0,0,0.7)"
          textAlign={"center"}
        >
          {" "}
          {moment().format("MMMM Do YYYY")}{" "}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  return (
    <>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{ gap: "2rem", marginBottom: "6rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: {
                lg: "2rem 3.5rem",
              },
              borderRadius: "1rem",
              width: "100%",
              //   height: "28rem",
            }}
          >
            <Typography margin={"2rem 0rem"} variant="h4">
              {module === "in"
                ? "Add Income"
                : module === "sa"
                ? "Add Saving"
                : module === "ex"
                ? "Add Expenses"
                : "Add"}
            </Typography>

            <Box sx={{ marginBottom: "2rem" }}>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Title"
                variant="standard"
              />
            </Box>

            <Box sx={{ marginBottom: "2rem" }}>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Description"
                variant="standard"
              />
            </Box>

            <Box sx={{ marginBottom: "2rem" }}>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Price"
                variant="standard"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4rem"
              }}
            >
              <Button
                variant="contained"
                sx={{
                  minWidth: "10rem",
                  borderRadius: "0.5rem",
                }}
              >
                Add
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default Form;
