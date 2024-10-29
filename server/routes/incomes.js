import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncomeById,
  getList,
  updateIncome,
} from "../controllers/incomes.js";

const app = express.Router();

app.post("/add", addIncome);

app.put("/update", updateIncome);

app.delete("/delete/:id", deleteIncome);

app.get("/get/:id", getIncomeById);

app.post("/list", getList);

export default app;
