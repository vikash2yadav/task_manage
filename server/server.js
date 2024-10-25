import express from "express";
import dotenv from "dotenv";
import {createServer} from "http";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const server = createServer(app);

//listening server
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})