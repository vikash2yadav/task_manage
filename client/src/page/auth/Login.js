import React, { useContext, useState } from "react";
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
import { useFileHandler, useInputValidation } from "6pp";
import { emailValidator } from "../../utils/validators.js";
import { newUserApi, loginApi } from "../../apis/users.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../../context/CommonContext.js";
import Loader from "../../components/Loader/index.js";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const { loading, setLoading } = useContext(CommonContext);

  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("");
  const name = useInputValidation("");

  const avtar = useFileHandler("single");

  const handleLogin = async (emailValue, passwordValue) => {
    setLoading(true);
    try {
      let response = await loginApi(`user/login`, {
        email: emailValue,
        password: passwordValue,
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (nameValue, emailValue, passwordValue) => {
    setLoading(true);
    try {
      let response = await newUserApi(`user/new`, {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          setIsLogin(true);
        }, 500);
      } else {
        console.log(response);
        toast.error(response?.data);
      }
    } catch (error) {
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
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
                borderRadius: "10px 50px",
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
                    onSubmit={(e) => {
                      handleLogin(email?.value, password?.value);
                      e.preventDefault();
                    }}
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
                      InputProps={{
                        style: { borderRadius: "10px", height: "50px" },
                      }}
                    />
                    {email.error && (
                      <Typography color="error" variant="caption">
                        {email.error}
                      </Typography>
                    )}
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      value={password.value}
                      onChange={password.changeHandler}
                      onBlur={password.changeHandler}
                      InputProps={{
                        style: { borderRadius: "10px", height: "50px" },
                      }}
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
                      {/* <hr /> */}
                    </Typography>
                    <Button
                      sx={{ marginTop: "1rem" }}
                      fullWidth
                      variant="text"
                      color="secondary"
                      onClick={() => {
                        setIsLogin(false);
                      }}
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRegister(
                        name?.value,
                        email?.value,
                        password?.value
                      );
                    }}
                  >
                    <Stack
                      position={"relative"}
                      width={{
                        xs: "6rem",
                        sm: "8rem",
                      }}
                      margin={"auto"}
                    >
                      <Avatar
                        sx={{
                          width: { xs: "6rem", sm: "8rem" },
                          height: { xs: "6rem", sm: "8rem" },
                          objectFit: "contain",
                        }}
                        src={avtar?.preview}
                      />
                      {/* {avtar.error && (
                    <Typography
                      m={"1rem"}
                      width={"fit-content"}
                      display={"block"}
                      color="error"
                      variant="caption"
                    >
                      {avtar.error}
                    </Typography>
                  )} */}
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
                      required
                      fullWidth
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      value={name.value}
                      onChange={name.changeHandler}
                      onBlur={name.changeHandler}
                      InputProps={{
                        style: { borderRadius: "10px", height: "50px" },
                      }}
                    />
                    {name.error && (
                      <Typography color="error" variant="caption">
                        {name.error}
                      </Typography>
                    )}
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      value={email.value}
                      onChange={email.changeHandler}
                      onBlur={email.changeHandler}
                      InputProps={{
                        style: { borderRadius: "10px", height: "50px" },
                      }}
                    />
                    {email.error && (
                      <Typography color="error" variant="caption">
                        {email.error}
                      </Typography>
                    )}
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      value={password.value}
                      onChange={password.changeHandler}
                      onBlur={password.changeHandler}
                      InputProps={{
                        style: { borderRadius: "10px", height: "50px" },
                      }}
                    />
                    {password.error && (
                      <Typography color="error" variant="caption">
                        {password.error}
                      </Typography>
                    )}
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
                      {/* <hr /> */}
                    </Typography>
                    <Button
                      sx={{ marginTop: "1rem" }}
                      fullWidth
                      variant="text"
                      color="secondary"
                      onClick={() => {
                        setIsLogin(true);
                      }}
                    >
                      Login
                    </Button>
                  </form>
                </>
              )}
            </Paper>
          </Container>
        </div>
      )}
    </>
  );
};

export default Login;
