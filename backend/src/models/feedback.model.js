import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema({
  userName: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
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