import mongoose, {Schema} from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import { Feedback } from "../models/feedback.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const newFeedback = asyncHandler(async (req, res) => {
    const { email, content } = req.body

    if(!email){
        throw new ApiError(400, "email is required")
    }

    if (!content) {
        throw new ApiError(400, "content is required");
    }

    const newFeedback = new Feedback({
        email: email,
        content: content
    })

    try {
        const savedFeedback = await newFeedback.save();

        return res.status(201).json(
            new ApiResponse(
                201,
                savedFeedback,
                "Feedback added successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while adding feedback");
    }
});

const getFeedbackById = asyncHandler(async (req, res) => {
    const feedbackId = req.params._id;

    try {
        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            throw new ApiError(404, "Feedback not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                feedback,
                "Feedback retrieved successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting feedback");
    }
});


const getAllFeedback = asyncHandler(async (req, res) => {
    try {
        const feedback = await Feedback.find();

        if (!feedback || feedback.length === 0) {
            throw new ApiError(404, "No feedback found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                feedback,
                "Feedback retrieved successfully"
            )
        );
    } catch (error) {
        console.error("Error while fetching all feedback:", error.message);
        throw new ApiError(500, "Something went wrong while getting all feedbacks");
    }
});

const deleteFeedback = asyncHandler(async (req, res) => {
    const feedbackId = req.params._id;

    try {
        const feedback = await Feedback.findByIdAndDelete(feedbackId);

        if (!feedback) {
            throw new ApiError(404, "Feedback not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Feedback deleted successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting feedback");
    }
})


export { 
    newFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback 
}