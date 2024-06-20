import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  text: { 
    type: String, 
    required: true 
}
},{
    timestamps: true
})

export const Feedback = mongoose.model("Feedback", feedbackSchema);