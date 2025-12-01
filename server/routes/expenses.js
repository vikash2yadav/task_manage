import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenseById,
  getList,
  updateExpense,
} from "../controllers/expenses.js";
import { userAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/add", userAuth, addExpense);

app.put("/update", userAuth, updateExpense);

app.delete("/delete/:id", userAuth, deleteExpense);

app.get("/get/:id", userAuth, getExpenseById);

app.post("/list", userAuth, getList);

export default app;
