import express from "express";
import {
  addSaving,
  deleteSaving,
  getList,
  getSavingById,
  updateSaving,
} from "../controllers/savings.js";

const app = express.Router();

app.post("/add", addSaving);

app.put("/update", updateSaving);

app.delete("/delete/:id", deleteSaving);

app.get("/get/:id", getSavingById);

app.post("/list", getList);

export default app;
