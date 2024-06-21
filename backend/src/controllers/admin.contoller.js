import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Admin} from "../models/admin.model.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(adminId) => {
    try {
        const user = await Admin.findById(adminId)
        if(!user){
            throw new ApiError(404, "user not found")
        }

        const accessTokenAdmin = user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save()

        return { accessTokenAdmin, refreshToken }

    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
    }
}

const loginAdmin = asyncHandler(async (req, res) => {
    const { adminId, password } = req.body;

    if (!adminId) {
        throw new ApiError(400, "Admin ID is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await Admin.findOne({ adminId });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    if (password !== user.password) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessTokenAdmin, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await Admin.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true // Adjust according to your needs
    };

    return res.status(200)
        .cookie("accessTokenAdmin", accessTokenAdmin, options)
        .cookie("refreshTokenAdmin", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: loggedInUser, accessTokenAdmin, refreshToken },
            "Login successful"
        ));
});


const logoutAdmin = asyncHandler( async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout successfull"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshTokenAdmin || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized access")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET)
        
        const user = await Admin.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token ")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessTokenAdmin,refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res.status(200)
        .cookie("accessToken", accessTokenAdmin, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessTokenAdmin, refreshToken: newRefreshToken
                },
                "Access token refreshed" 
            )
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export { 
    loginAdmin,
    logoutAdmin,
    refreshAccessToken
 }