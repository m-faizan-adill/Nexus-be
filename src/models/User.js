import mongoose from "mongoose";
import { ROLES } from "../constants/roles";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
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