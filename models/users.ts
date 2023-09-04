import mongoose from "mongoose";

// mongodb schema for users
const usersSchema = new mongoose.Schema({

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
    }
},
    {timestamps: true})

export const User = mongoose.model("User", usersSchema);

