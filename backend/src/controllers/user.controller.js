import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
//import { enableCompileCache } from "node:module";
import { ApiResponse } from "../utils/ApiResnponse.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToekn = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh token.");
    }
}

const registerUser = asyncHandler( async (req, res) => {
    //register user
    //get the data from the form
    // res.status(200).json({
    //     message: "OK"
    // })

    //regiater user
    // get the data from the form
    //check email, password or username is not emty or not
    //check user is alreay exist or not
    //decrypt password
    //verify password
    //insert data in datamodel
    //remove password and refresh token field from response
    //check for ussr creattion
    //send response(return)

    const { username, email, password, role } = req.body;
    //console.log(req.body);


    if(
        [username, email, password].some((data) => data?.trim() === "")
    ) {
        throw new ApiError(400, "All fileds are required");
    }

    if(role==="admin") {
        throw new ApiError(400, "FOr new login, role can't be admin.");
    }


   const existedUser = await User.findOne(
        {
            $or :[{username}, {email}]
        }
    )

    if(existedUser) {
        throw new ApiError(409, "User is already exist.")
    }

    const user = await User.create({
        username,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Error occured during creating user")
    }

    return res.status(201).
    json(
        new ApiResponse(200, createdUser, "Created user successfullu"
        )
    )
});

const loginUser = asyncHandler( async (req, res) => {
    //req -> data
    //username or email
    // find the user
    //password check
    //access and refresh token
    //send to user this token as cookie (secure)

    const { email, username, password, role } = req.body
    console.log(req.body)
    if(!username && !email) {
        throw new ApiError(400, "Username or Email is required.");
    } 

    const user = await User.findOne({
        $or: [ {email}, {username}]
    });

    if(!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Password is not correct.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToekn(user._id);

    const loggedUser =  await User.findById(user._id).select("-password -refreshToken");

    const options = {
       // httpOnly: true,
        secure: true
    }

    return res.
    status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new ApiResponse(200, {
            user: loggedUser, accessToken,
            refreshToken
        }, "User logged successfully")
    );
});

const logoutUser = asyncHandler( async (req, res) => {
    //remove cookies
    //remove refresh Token
    //finduser

    console.log("I am here now");

    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        }
    },
    {
    new: true
    })

  const options = {
   // httpOnly: true,
    secure: true
  }

  return res.
  status(200).
  clearCookie("accessToken", options).
  clearCookie("refreshToken", options).
  json(
    new ApiResponse(200, {}, "User logged out successfully")
    );
})

const protectedController = asyncHandler (async (req, res) => {

    if(!req.user) {
        throw new ApiError(401, "User is not authenticated.");
    }

    return res.status(200).json(
        new ApiResponse(200, { user: req.user }, "User is authenticated.")
    )
})

const adminLogin = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body
    console.log(req.body)
    if(!username && !email) {
        throw new ApiError(400, "Username or Email is required.");
    }

    if(role !=="admin") {
        throw new ApiError(400, "For admin login, role must be admin.");
    }

    const adminUser = await User.findOne({
        $or: [ {email}, {username}]
    });

    if(!adminUser) {
        throw new ApiError(404, "Admin user not found.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToekn(adminUser._id);


    const admin = await User.findById(adminUser.id).select("-password -refreshToken");
    return res.status(200).
    cookie("accessToken", accessToken).
    cookie("refreshToken", refreshToken).
    json(
        new ApiResponse(200, { user: admin, accessToken, refreshToken }, "Admin is authenticated.")
    )
})

const protectedAdmin = asyncHandler (async (req, res) => {
    console.log(req.user);
    if(!req.user) {
        throw new ApiError(401, "User is not authenticated.");
    }
    console.log(req.user);

    if(req.user.role!== "admin") {
        throw new ApiError(403, "You are not authorized to access this page.");
    }

    console.log(req.user);

    return res.status(200).json(
        new ApiResponse(200, { user: req.user }, "User is authenticated.")
    )
})

export { registerUser,
    loginUser,
    logoutUser,
    protectedController,
    protectedAdmin,
adminLogin };
 