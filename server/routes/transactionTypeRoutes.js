import express from "express";
import protect from 'enigma-user-management/middleware/authMiddleware.js';
import {
    getAllTransactionTypes,
    addTransactionType,
    updateTransactionType,
    deleteTransactionType
} from "../controllers/transactionTypeController.js";

const router = express.Router();

router.get("/", protect, getAllTransactionTypes);
router.post("/", protect, addTransactionType);
router.put("/:id", protect, updateTransactionType);
router.delete("/:id", protect, deleteTransactionType);

export default router;
