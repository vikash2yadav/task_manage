import express from "express";
import {
    getList
} from "../controllers/incomes.js";

const app = express.Router();

app.post("/list", getList);

export default app;
