import mongoose, {Schema} from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import { Feedback } from "../models/feedback.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const newFeedback = asyncHandler(async (req, res) => {
    const { email, content, userName } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    if (!userName) {
        throw new ApiError(400, "UserName is required");
    }

    const feedback = new Feedback({
        email: email,
        content: content,
        userName: userName
    });

    try {
        const savedFeedback = await feedback.save();
        return res.status(201).json(
            new ApiResponse(
                201,
                savedFeedback,
                "Feedback added successfully"
            )
        );
    } catch (error) {
        console.error(error); 
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

const updateFeedback = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const feedbackId = req.params._id;

    try {
        const feedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            {
                $set:{
                    content: content
                }
            },
            {
                new: true
            }
        );

        if (!feedback) {
            throw new ApiError(404, "Feedback not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                feedback,
                "Feedback updated successfully"
            )
        );
    } catch (error) {
        console.error("Error while updating feedback:", error.message);
        throw new ApiError(500, "Something went wrong while updating feedback");
    }
})    



export { 
    newFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedback 
}