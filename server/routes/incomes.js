import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncomeById,
  getList,
  updateIncome,
} from "../controllers/incomes.js";
import { userAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/add", userAuth, addIncome);

app.put("/update", userAuth, updateIncome);

app.delete("/delete/:id", userAuth, deleteIncome);

app.get("/get/:id", userAuth, getIncomeById);

app.post("/list", userAuth, getList);

export default app;
