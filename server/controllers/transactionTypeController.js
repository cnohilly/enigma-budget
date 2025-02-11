import { getDatabase } from "../dbConnections.js";

// Get all transaction types
export const getAllTransactionTypes = async (req, res) => {
    try {
        const types = await getDatabase().TransactionType.find();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new transaction type
export const addTransactionType = async (req, res) => {
    try {
        const type = new getDatabase().TransactionType(req.body);
        await type.save();
        res.status(201).json(type);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a transaction type
export const updateTransactionType = async (req, res) => {
    try {
        const type = await getDatabase().TransactionType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!type) {
            return res.status(404).json({ error: "Transaction type not found" });
        }
        res.json(type);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a transaction type
export const deleteTransactionType = async (req, res) => {
    try {
        const type = await getDatabase().TransactionType.findByIdAndDelete(req.params.id);
        if (!type) {
            return res.status(404).json({ error: "Transaction type not found" });
        }
        res.json({ message: "Transaction type deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
