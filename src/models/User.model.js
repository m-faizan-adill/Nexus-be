import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: [ROLES.ENTREPRENEUR, ROLES.INVESTOR],
      required: true,
    },

    avatarUrl: String,
    bio: String,
    isOnline: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);