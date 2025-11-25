import React, { useContext, useState } from "react";
import { purpleGradient } from "../../constants/color";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../../components/styles/styledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { newUserApi, loginApi } from "../../apis/users.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../../context/CommonContext.js";
import Loader from "../../components/Loader/index.js";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const { loading, setLoading } = useContext(CommonContext);

  const email = useInputValidation("");
  const password = useInputValidation("");
  const name = useInputValidation("");

  const avtar = useFileHandler("single");

  const handleSwitchMode = () => {
    // Clear validation errors when switching modes
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleLogin = async (emailValue, passwordValue) => {
    setLoading(true);
    try {
      let response = await loginApi(`user/login`, {
        email: emailValue,
        password: passwordValue,
      });

      if (response?.data?.success === true) {
        localStorage.setItem("token", response?.data?.token);
        toast.success(response?.data?.message);
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Login failed!");
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

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setIsLogin(true);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log('error', error)
      toast.error("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(email.value, password.value);
    } else {
      handleRegister(name.value, email.value, password.value);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        backgroundImage: purpleGradient,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
            position: "relative",
            minHeight: isLogin ? "400px" : "600px",
            transition: "all 0.3s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            },
          }}
        >
          <Fade in={!isAnimating} timeout={300}>
            <Box sx={{ width: "100%" }}>
              {/* Header Section */}
              <Box textAlign="center" mb={4}>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  color="primary.main"
                  gutterBottom
                >
                  {isLogin ? "Login" : "Register Now"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ opacity: 0.8 }}
                >
                  {isLogin
                    ? "Sign in to continue your journey"
                    : "Join us and get started today"}
                </Typography>
              </Box>

              {/* Avatar for Sign Up */}
              {!isLogin && (
                <Stack
                  position="relative"
                  width="100px"
                  height="100px"
                  margin="auto"
                  mb={3}
                >
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderColor: "primary.main",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    src={avtar?.preview}
                  />
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -5,
                      color: "white",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                      width: 32,
                      height: 32,
                    }}
                    size="small"
                  >
                    <CameraAlt fontSize="small" />
                    <VisuallyHiddenInput type="file" />
                  </IconButton>
                </Stack>
              )}

              {/* Form Section */}
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* Name Field for Sign Up */}
                  {!isLogin && (
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      value={name.value}
                      onChange={name.changeHandler}
                      onBlur={name.changeHandler}
                      error={!!name.error}
                      helperText={name.error}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "white",
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    />
                  )}

                  {/* Email Field */}
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    value={email.value}
                    onChange={email.changeHandler}
                    onBlur={email.changeHandler}
                    error={!!email.error}
                    helperText={email.error}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "white",
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                    onBlur={password.changeHandler}
                    error={!!password.error}
                    helperText={password.error}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "white",
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />

                  {/* Submit Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      borderRadius: "12px",
                      padding: "12px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                      },
                      transition: "all 0.3s ease",
                      marginTop: 1,
                    }}
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </Stack>
              </Box>

              {/* Switch Mode Section */}
              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSwitchMode}
                  disabled={isAnimating}
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
