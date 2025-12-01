import express from "express";
import {
  addSaving,
  deleteSaving,
  getList,
  getSavingById,
  updateSaving,
} from "../controllers/savings.js";
import { userAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/add", userAuth, addSaving);

app.put("/update", userAuth, updateSaving);

app.delete("/delete/:id", userAuth, deleteSaving);

app.get("/get/:id", userAuth, getSavingById);

app.post("/list", userAuth, getList);

export default app;
