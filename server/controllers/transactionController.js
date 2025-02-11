import Transaction from "../models/Transaction.js";

// Get all transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("transactionType").populate("user");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("transactionType").populate("user");
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new transaction
export const addTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a transaction
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
