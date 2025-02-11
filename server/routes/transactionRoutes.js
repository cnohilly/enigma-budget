import express from "express";
import {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.post("/", addTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
