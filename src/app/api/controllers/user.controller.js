import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"

const usersData = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

const userData = asyncHandler(async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        res.json(getUser);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});


// Controller to delete a user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedUser = await User.findByIdAndDelete({ _id : id});
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        return res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        console.error("Error while deleting user:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

  

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, gender, userType, password } = req.body;

    if (!firstName || !lastName || !email || !gender || !userType || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }


        const user = await User.create({
            firstName,
            lastName,
            email,
            gender,
            userType,
            password,
        });

        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            return res.status(500).json({ error: "Error while registering the user" });
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully!"));
    } catch (error) {
        console.error("Error while registering user:", error);
        return res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }

    try {
        const getUser = await User.findOne({ email });
        if (!getUser) {
            return res.status(404).json({ error: "Invalid Username or Password!" });
        }
        console.log(password);
        
        const isPasswordValid = User.validate()
       if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password!" });
        }
    
        const loggedInUser = await User.findById(getUser._id).select("-password");
    
        return res.status(200).json(new ApiResponse(200, { user: loggedInUser }, "User logged in successfully!"));
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
    }
    
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully!"));
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
});



export { registerUser, loginUser, logoutUser, usersData, userData, deleteUser };
