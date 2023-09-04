import mongoose from "mongoose";

// schema for a transaction

const transactionSchema = new mongoose.Schema({
    // details of items bought and their price
    items: [{
        item: String,
        quantity: Number,
        totalPrice: Number
    }],
    // reference to user's object id
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Transaction = mongoose.model("Transaction", transactionSchema);