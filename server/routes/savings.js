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

app.post("/add", addSaving);

app.put("/update", updateSaving);

app.delete("/delete/:id", deleteSaving);

app.get("/get/:id", getSavingById);

app.post("/list", userAuth, getList);

export default app;
