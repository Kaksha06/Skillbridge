import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { response } from "express"
import { log } from "console"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshTokens = async(UserId)=>{
     try {
        const user = await User.findById(UserId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and referesh tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    const { id, name, email, password, role, skills, location, bio } = req.body;
    
    // Validation - check if required fields are not empty
    if ([id, name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All required fields must be provided");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ id }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with this ID or email already exists");
    }

    // Create user object and save to DB
    const user = await User.create({
        id,
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'volunteer', // Default role is 'volunteer' if not specified
        skills: skills || [],
        location: location || '',
        bio: bio || ''
    });

    // Remove sensitive fields before sending response
    const createdUser = await User.findOne({ id }).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    // Return success response with user data and tokens
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    // return res
    //     .status(201)
    //     .cookie('refreshToken', refreshToken, options)
    //     .json(
    //         new ApiResponse(
    //             201,
    //             {
    //                 user: createdUser,
    //                 accessToken: token
    //             },
    //             "User registered successfully"
    //         )
    //     );
})

const loginUser = asyncHandler(async (req, res) => {
    // Get email/username and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Get user details without sensitive data
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set refresh token in HTTP-only cookie
    const options = {
        httpOnly: true,
        secure: true
    };

    // Return success response with user data and tokens
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async(req,res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true,
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
});
 
const getProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        return res
        .status(404)
        .json(new ApiResponse(200, {}, "User not found"));

    res.json(user);
    }
});

const updateProfile = asyncHandler(async(req,res)=>{
    const { fullName, email, location, skills} = req.body
    if (!(fullName || email)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email,
                location:location,
                skills:skills
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})
export {
    generateAccessAndRefreshTokens,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile
}
