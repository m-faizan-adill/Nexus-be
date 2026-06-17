import crypto from "crypto";

import User from "../models/User.js";
import EntrepreneurProfile from "../models/EntrepreneurProfile.js";
import InvestorProfile from "../models/InvestorProfile.js";
import { generateToken } from "../utils/jwt.util.js";
import { comparePassword, hashPassword } from "../utils/password.util.js";
import { STATUS } from "../constants/statusCodes.js";

export const registerUser = async ({ name, email, password, role }) => {
    if (!["entrepreneur", "investor"].includes(role)) {
        const error = new Error("Invalid role");
        error.statusCode = STATUS.BAD_REQUEST;
        throw error;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = STATUS.CONFLICT;
        throw error;
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, role });
    const profile =
        user.role === "entrepreneur"
            ? await EntrepreneurProfile.findOne({ user: user._id })
            : await InvestorProfile.findOne({ user: user._id });

    const token = generateToken(user._id);
    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}

export const loginUser = async ({ email, password, role }) => {
    const user = await User.findOne({ email, role }).select("+password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = STATUS.NOT_FOUND;
        throw error;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = STATUS.UNAUTHORIZED;
        throw error;
    }

    const token = generateToken(user._id);
    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isOnline: user.isOnline,
            avatarUrl: user.avatarUrl,
            bio: user.bio
        },
    };
};

export const getUser = async (id) => {
    const user = await User.findById(id).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = STATUS.NOT_FOUND;
        throw error;
    }
    let profile = null;
    if (user.role === "entrepreneur") {
        profile = await EntrepreneurProfile.findOne({
            user: user._id,
        });
    }

    if (user.role === "investor") {
        profile = await InvestorProfile.findOne({
            user: user._id,
        });
    }
    return { user, profile };
};

export const forgotPassword = async ({ email }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("No account found with this email");
        error.statusCode = STATUS.NOT_FOUND;
        throw error;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // await sendResetEmail(user.email, resetToken);
    return { message: "Reset email sent" };
};

export const resetPassword = async ({ token, newPassword }) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        const error = new Error("Invalid or expired token");
        error.statusCode = STATUS.BAD_REQUEST;
        throw error;
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return { message: "Password reset successful" };
};