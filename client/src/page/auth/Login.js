import React, { useState } from "react";
import { bgGradient } from "../../constants/color";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../../components/styles/styledComponents";
import { useInputValidation } from "6pp";
import { emailValidator } from "../../utils/validators.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("");

  const handleLogin = async () => {
    
  }

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  value={email.value}
                  onChange={email.changeHandler}
                  onBlur={email.changeHandler}
                />
                {email.error && (
                  <Typography color="error" variant="caption">
                    {email.error}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  value={password.value}
                  onChange={password.changeHandler}
                  onBlur={password.changeHandler}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
                >
                  Continue
                </Button>
                <Typography textAlign="center" m={"1rem"}>
                  <hr />
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={""}
              >
                <Stack position={"relative"} width={"8rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "8rem",
                      height: "8rem",
                      objectFit: "contain",
                    }}
                    //   src={avtar.preview}
                  />
                  {"avtar.error" && (
                    <></>
                    // <Typography
                    //   m={"1rem"}
                    //   width={"fit-content"}
                    //   display={"block"}
                    //   color="error"
                    //   variant="caption"
                    // >
                    //   {/* {avtar.error} */}
                    // </Typography>
                  )}
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput
                        type="file"
                        // onChange={}
                      />
                    </>
                  </IconButton>
                </Stack>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  // value={name.value}
                  // onChange={name.changeHandler}
                />
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  // value={username.value}
                  // onChange={username.changeHandler}
                />
                {/* {username.error && (
            <Typography color="error" variant="caption">
              {username.error}
            </Typography>
          )} */}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  // value={password.value}
                  // onChange={password.changeHandler}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={() => {}}
                  sx={{
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
                >
                  Continue
                </Button>
                <Typography textAlign="center" m={"1rem"}>
                  <hr />
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
