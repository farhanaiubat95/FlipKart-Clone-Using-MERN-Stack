import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import jwt_Token from "../dotenv/JWT_Token.js";
// import { MailtrapClient } from 'mailtrap';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// register 
export const Signup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone, address, role, activity, password } = req.body;

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
            return res.status(400).json({ success: false, message: "Phone number must be at least 11 digits" });
        }

        // Create new user
        const user = new userModel({
            firstname,
            lastname,
            username,
            email,
            phone,
            address,
            role,
            password,
            activity,
            otp: verifyCode,
            otpExpires: Date.now() + 10 * 60 * 1000,
        });

        await user.save();

        // Setup Nodemailer transporter with Mailtrap SMTP
        const transporter = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            }
          });

        // Send OTP email
        await transporter.sendMail({
            from: process.env.MAILTRAP_USER , // sender
            to: email, // receiver
            subject: "Your OTP Code",
            text: `Hello ${firstname}, your OTP code is: ${verifyCode}`
        });

        // JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, { expiresIn: "2d" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 48, // 2 days
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
    try{
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({success: false, message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(400).json({success: false, message: "Please verify your email" });
        }
        if (!user.activity) {
            return res.status(400).json({success: false, message: "Your account is inactive" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Given password is incorrect" });
        }

        // create token, after login successfully
        const token = jwt.sign({userId: user._id}, jwt_Token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });        
        
        return res.status(200).json({success: true, user, message: "User logged in successfully" , token});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
        console.log(error);
    }
}
        
// logout
export const Logout = async (req, res) => {
    try{
        res.clearCookie('token');
        return res.status(200).json({success: true, message: "User logged out successfully" });
    }catch(error){
        res.status(500).json({success: false, message: error.message});
        console.log(error);
    }
}