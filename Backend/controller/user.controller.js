import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const signup = async(req, res) => {
    try {
        const { fullname, email, password, role = 'user' } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash password
        const hashPassword = await bcryptjs.hash(password, 10);
        
        // Create new user
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role: role
        });
        
        await createdUser.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: createdUser._id, email: createdUser.email, role: createdUser.role },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                role: createdUser.role
            },
            token: token
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Check password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            token: token
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user profile
export const getUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create admin (protected route)
export const createAdmin = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash password
        const hashPassword = await bcryptjs.hash(password, 10);
        
        // Create new admin
        const createdAdmin = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role: 'admin'
        });
        
        await createdAdmin.save();
        
        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                _id: createdAdmin._id,
                fullname: createdAdmin.fullname,
                email: createdAdmin.email,
                role: createdAdmin.role
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users (admin only)
export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};