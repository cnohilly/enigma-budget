import express from "express";
import protect from 'enigma-user-management/middleware/authMiddleware.js';
import {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", protect, getAllTransactions);
router.get("/:id", protect, getTransactionById);
router.post("/", protect, addTransaction);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
