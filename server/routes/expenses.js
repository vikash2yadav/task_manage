import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenseById,
  getList,
  updateExpense,
} from "../controllers/expenses.js";

const app = express.Router();

app.post("/add", addExpense);

app.put("/update", updateExpense);

app.delete("/delete/:id", deleteExpense);

app.get("/get/:id", getExpenseById);

app.post("/list", getList);

export default app;
