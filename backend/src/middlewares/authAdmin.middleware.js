import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";

export const verifyJWTAdmin = asyncHandler(async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies?.accessTokenAdmin;
        const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token from Cookie:", tokenFromCookie);
        console.log("Token from Header:", tokenFromHeader);

        const token = tokenFromCookie || tokenFromHeader;

        if (!token) {
            console.log("No token provided");
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        console.log("Decoded Token:", decodedToken);

        const user = await Admin.findById(decodedToken?._id).select("-password -refreshToken");
        console.log("User:", user);

        if (!user) {
            console.log("User not found or invalid token");
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error:", error.message);
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
