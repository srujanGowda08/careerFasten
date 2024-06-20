import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);