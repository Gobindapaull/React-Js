import User from "../models/User.js";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });
        console.log("Sending OTP:", otp);
        console.log("To:", email);
        console.log("PASS LENGTH:", process.env.APP_PASSWORD?.length);
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP code",
            html: `
            <h2>Your login OTP</h2>
            <h1>${otp}</h1>
            <p>Valid for 5 minutes</p>
            `
        });
        console.log(`Email sent: ${JSON.stringify(info, null, 2)}`);
        res.status(200).json({
            success: true,
            message: "OTP sent"
        });
    } catch (error) {
        console.error("MAIL ERROR:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({
                message: "OTP not found"
            });
        }
        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }
        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }
        await Otp.deleteMany({ email });
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            });
        res.json({
            success: true,
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
