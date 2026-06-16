import User from "../models/User.js";
import { generateToken, verifyToken } from "../utils/jwt.util.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashed = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
        });

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, role });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password"
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};