import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next) => {
    // Verify access token from cookies or authorization header, and attach user to request object if valid
    
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
           //console.log("Token:", token);

            if(!token) {
                throw new ApiError(401, "Unatuhtorized request.");
            }
           //console.log("Hello i reach here.");
           //console.log("Secret:", process.env.ACCESS_TOKEN_SECRET);
           let decodedToken;
            try {
              decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            } catch (error) {
                console.error("JWT verification failed:", error);
                throw new ApiError(401, error?.message || "Invalid access token.");
            }
           console.log("decoded token: ", decodedToken);

           const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
           //console.log("user:", user);

           if(!user) {
            throw new ApiError(401, "Invalid access token.");
           }

           req.user = user;
           next();
            
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid access token.");
        }
    
}) 