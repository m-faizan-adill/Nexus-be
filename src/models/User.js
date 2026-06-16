import mongoose from "mongoose";

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
      enum: ["entrepreneur", "investor"],
      required: true,
    },

    avatarUrl: String,
    bio: String,
    isOnline: {
      type: Boolean,
      default: false,
    },

    // Entrepreneur Fields
    startupName: String,
    pitchSummary: String,
    fundingNeeded: String,
    industry: String,
    location: String,
    foundedYear: Number,
    teamSize: Number,

    // Investor Fields
    investmentInterests: [String],
    investmentStage: [String],
    portfolioCompanies: [String],
    totalInvestments: Number,
    minimumInvestment: String,
    maximumInvestment: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);