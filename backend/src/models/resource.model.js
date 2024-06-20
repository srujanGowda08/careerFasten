import mongoose, { Schema } from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: { 
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},{
    timestamps: true
});

export const Resource = mongoose.model("Resource", resourceSchema);


