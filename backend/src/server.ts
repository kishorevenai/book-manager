import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOption";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Get all books
app.get("/api/books", (req, res) => {});

// Get books for a specific user
app.use("/api/auth", authRoutes);

app.listen(3500, () => {
  console.log("Server is running on port 3500");
});
