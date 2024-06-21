import mongoose, {Schema} from "mongoose";
import {User} from "../models/user.model.js";

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userName : {
    type: String,
    required: [true, 'Fullname is required'],
    trim: true
},
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true 
}
},{
    timestamps: true
})

export const Feedback = mongoose.model("Feedback", feedbackSchema);