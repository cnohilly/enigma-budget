import mongoose from "mongoose";

const transactionTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true, collection: 'transaction-types' });

transactionTypeSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

transactionTypeSchema.set("toObject", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const TransactionType = mongoose.model('TransactionType', transactionTypeSchema);

export default TransactionType;
