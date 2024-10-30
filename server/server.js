import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import { connectDB } from "./dotenv/db.js";
import userRoute from "./routes/users.js";
import incomeRoute from "./routes/incomes.js";
import expenseRoute from "./routes/expenses.js";
import savingRoute from "./routes/savings.js";

dotenv.config({ path: ".env" });

const app = express();

// database connection
const mongoUri = process.env.MONGO_URL;

connectDB(mongoUri);

// middlewares
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/income", incomeRoute);
app.use("/expense", expenseRoute);
app.use("/saving", savingRoute);

const server = createServer(app);

//listening server
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
