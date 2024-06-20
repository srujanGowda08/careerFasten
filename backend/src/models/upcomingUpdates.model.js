import mongoose, { Schema } from "mongoose";

const upcomingupdatesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    companyName: {
        type: String,
        required: [true, 'Company Name is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    }
}, { timestamps: true })


export const Upcomingupdates = mongoose.model("Upcomingupdates", upcomingupdatesSchema);