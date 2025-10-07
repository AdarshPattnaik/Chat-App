import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';
import bcrypt from 'bcryptjs';

// Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        const user = await User.findOne({ email }); // ✅ fixed typo
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Account already exists."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);

        return res.status(201).json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully."
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // ✅ fixed destructuring
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(userData._id);

        return res.status(200).json({
            success: true,
            userData,
            token,
            message: "Logged in successfully."
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            );
        }

        res.json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
