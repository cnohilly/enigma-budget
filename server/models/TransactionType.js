import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true, collection: 'transaction-types' });

schema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

schema.set("toObject", {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

export const transactionTypeSchema = schema;
