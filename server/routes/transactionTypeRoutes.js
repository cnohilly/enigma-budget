import express from "express";
import {
    getAllTransactionTypes,
    addTransactionType,
    updateTransactionType,
    deleteTransactionType
} from "../controllers/transactionTypeController.js";

const router = express.Router();

router.get("/", getAllTransactionTypes);
router.post("/", addTransactionType);
router.put("/:id", updateTransactionType);
router.delete("/:id", deleteTransactionType);

export default router;
