import express from "express";
import {
  changePassword,
  getCount,
  getMyProfile,
  login,
  logout,
  newUser,
  sentOtp,
} from "../controllers/users.js";
import { userAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newUser);

app.post("/login", login);

app.get("/me", userAuth, getMyProfile);

app.get("/logout", userAuth, logout);

app.get("/dashboard/count", userAuth, getCount);

app.post("/sent/otp", sentOtp);

app.post("/change-password", changePassword);

export default app;
