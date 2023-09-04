import mongoose from "mongoose";

// mongodb schema for pending users
const pendingUsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
        // lowercase: true
    },
    phoneNumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    tempHash: {
        type: String
    }
})

export const PendingUser = mongoose.model("PendingUser", pendingUsersSchema);

