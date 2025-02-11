import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import cors from "cors"; // Import CORS
import transactionRoutes from "./routes/transactionRoutes.js";
import transactionTypeRoutes from "./routes/transactionTypeRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import userRoutes from 'enigma-user-management/routes/userRoutes.js';
import authRoutes from 'enigma-user-management/routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/transaction-types", transactionTypeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.error('Error connected to DB:', error);
    process.exit(1);
})