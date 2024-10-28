import express from "express";
import {
    getList
} from "../controllers/expenses.js";

const app = express.Router();

app.post("/list", getList);

export default app;
