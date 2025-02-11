import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import cors from "cors"; // Import CORS
import { createDatabase } from "./dbConnections.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import transactionTypeRoutes from "./routes/transactionTypeRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
createDatabase();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/transaction-types", transactionTypeRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));