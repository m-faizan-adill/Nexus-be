import crypto from "crypto";

import User from "../models/User.model.js";
import EntrepreneurProfile from "../models/EntrepreneurProfile.model.js";
import InvestorProfile from "../models/InvestorProfile.model.js";
import { generateToken } from "../utils/jwt.util.js";
import { comparePassword, hashPassword } from "../utils/password.util.js";
import { throwError } from "../utils/apiError.util.js";
import { STATUS } from "../constants/statusCodes.js";
import { ROLES } from "../constants/roles.js";

export const registerUser = async ({ name, email, password, role }) => {
    if (!Object.values(ROLES).includes(role)) {
        const error = new Error("Invalid role");
        error.statusCode = STATUS.BAD_REQUEST;
        throw error;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throwError("User already exists", STATUS.CONFLICT);
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, role });
    const PROFILE_MODELS = {
        [ROLES.ENTREPRENEUR]: EntrepreneurProfile,
        [ROLES.INVESTOR]: InvestorProfile,
    };
    const ProfileModel = PROFILE_MODELS[role];

    if (ProfileModel) {
        await ProfileModel.create({ user: user._id, });
    }

    const token = generateToken(user._id);

    return {
        token,
        user: user,
    };
}

export const loginUser = async ({ email, password, role }) => {
    const user = await User.findOne({ email, role }).select("+password");
    if (!user) {
        throwError("User not found", STATUS.NOT_FOUND);
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
        throwError("User not found", STATUS.NOT_FOUND);
    }
    const PROFILE_MODELS = {
        [ROLES.ENTREPRENEUR]: EntrepreneurProfile,
        [ROLES.INVESTOR]: InvestorProfile,
    };
    const ProfileModel = PROFILE_MODELS[user.role];

    const profile = ProfileModel
        ? await ProfileModel.findOne({
            user: user._id,
        })
        : null;

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