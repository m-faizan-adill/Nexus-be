import mongoose from "mongoose";

const entrepreneurProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    startupName: {
      type: String,
      required: true,
    },

    pitchSummary: String,

    fundingNeeded: String,

    industry: String,

    location: String,

    foundedYear: Number,

    teamSize: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "EntrepreneurProfile",
  entrepreneurProfileSchema
);