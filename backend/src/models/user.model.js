import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    usn : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },   
    password : {
        type: String,
        required: [true, 'Password is required']
    }
},
{
    timestamps: true
})


export const User = mongoose.model("User", userSchema)