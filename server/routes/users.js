import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
} from "../controllers/users.js";

const app = express.Router();

app.post("/new", newUser);

app.post("/login", login);

app.get("/me", getMyProfile);

app.get("/logout", logout);

export default app;
