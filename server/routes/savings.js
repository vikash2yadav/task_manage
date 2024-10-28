import express from "express";
import {
    getList
} from "../controllers/savings.js";

const app = express.Router();

app.post("/list", getList);

export default app;
