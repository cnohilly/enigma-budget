import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    frequency: {
        type: String,
        validate: {
            validator: function (value) {
                return !value || /^[1-9][0-9]*[DWMY]$/.test(value);
            },
            message: props => `${props.value} is not a valid frequency format. Use formats like "1W", "20D", "3M", or "1Y".`
        }
    },
    amount: { type: mongoose.Types.Decimal128, required: true },
    transactionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransactionType",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

schema.pre("save", function (next) {
    if (this.amount !== undefined) {
        const roundedAmount = parseFloat(this.amount).toFixed(2);
        this.amount = mongoose.Types.Decimal128.fromString(roundedAmount);
    }
    next();
});


schema.set("toJSON", {
    transform: (doc, ret) => {
        ret.amount = parseFloat(ret.amount.toString());
        delete ret.__v;
        return ret;
    }
});

schema.set("toObject", {
    transform: (doc, ret) => {
        ret.amount = parseFloat(ret.amount.toString());
        delete ret.__v;
        return ret;
    }
});

export const transactionSchema = schema;
