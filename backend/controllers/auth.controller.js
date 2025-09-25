import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Signup request:", { name, email });
        
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "email already exists!" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            password: hashedPassword,
            email
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "sign up error" });
    }
};

// Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "email does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        return res.status(500).json({ message: `login error ${error}` });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "log out successfully" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` });
    }
};