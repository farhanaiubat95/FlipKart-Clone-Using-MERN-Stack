import userModel from "../model/userModel.js";
import productModel from "../model/productModel.js";
import categoriesModel from "../model/CategoriesModel.js";
import OrderModel from "../model/orderModel.js";
import jwt from "jsonwebtoken";
import jwt_Token from "../dotenv/JWT_Token.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// register 
export const Signup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone, address, role, sellerShop, password } = req.body;

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const existUser = await userModel.findOne({ username });
        const existEmail = await userModel.findOne({ email });

        if (existUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        if (existEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }
        if (phone.toString().length < 11 || phone.toString().length > 15) {
            return res.status(400).json({ success: false, message: "Phone number must be 11-15 digits" });
        }

        // Create user object
        const user = new userModel({
            firstname,
            lastname,
            username,
            email,
            phone,
            address,
            role,
            sellerShop: role === 'seller' ? sellerShop : 'No-shop', // only set shop if role is seller
            password,
            otp: verifyCode,
            otpExpires: Date.now() + 10 * 60 * 1000,
        });

        await user.save();

        // Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        // Send OTP email
        await transporter.sendMail({
            from: process.env.MAILTRAP_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Hello ${firstname}, your OTP code is: ${verifyCode}`
        });

        // JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRETE, { expiresIn: "2d" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 48,
        });

        return res.status(201).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            },
            message: "User registered successfully! Please verify your email",
            token: token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
};

export const VerifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
       const isCodeValid = user.otp===otp;
       const isCodeExpired = user.otpExpires > Date.now();
       
       if(isCodeValid && isCodeExpired){ 
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });
       }else if (!isCodeValid){
        return res.status(400).json({ success: false, message: "Invalid OTP" });
       }else {
        return res.status(400).json({ success: false, message: "OTP expired" });
       }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
}  

// login
export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "Please verify your email" });
        }
        if (!user.activity) {
            return res.status(400).json({ success: false, message: "Your account is inactive" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Given password is incorrect" });
        }

        // create token
        const token = jwt.sign({ userId: user._id }, jwt_Token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({ success: true, user, message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
};


// logout
export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
};


// update user
export const UpdateUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone, address, sellerShop } = req.body;

        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                firstname,
                lastname,
                username,
                email,
                phone,
                address,
                sellerShop,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        } else {
            return res.status(200).json({ success: true, message: "User updated successfully", user });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// GetAllProducts
export const GetAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({success: true, message: "Products fetched successfully",products});
    } catch (e) {
        console.log("Error in getAllProducts", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
}

// GetAllCategories
export const GetAllCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find({});
        res.status(200).json({success: true, message: "Categories fetched successfully",categories});
    } catch (e) {
        console.log("Error in getAllCategories", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
}

// GetAllOrders
export const AllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({success: true, message: "Orders fetched successfully",orders});
    } catch (e) {
        console.log("Error in getAllOrders", e.message);
        res.status(500).json({ success: false, message: e.message });
    }
}
