import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

// Get all books
app.get("/api/books", (req, res) => {});

// Get books for a specific user
app.use("/auth", authRoutes);

app.listen(3500, () => {
  console.log("Server is running on port 3500");
});
