import mongoose from "mongoose";

const investorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

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

export default mongoose.model(
  "InvestorProfile",
  investorProfileSchema
);