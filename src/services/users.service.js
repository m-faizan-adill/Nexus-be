import User from "../models/User.model.js";
import EntrepreneurProfile from "../models/EntrepreneurProfile.model.js";
import InvestorProfile from "../models/InvestorProfile.model.js";

import { STATUS } from "../constants/statusCodes.js";
import { throwError } from "../utils/apiError.util.js";

export const updateUserProfile = async (
  userId,
  updates
) => {
  const user = await User.findById(userId);

  if (!user) {
    throwError("User not found", STATUS.NOT_FOUND);
  }

  // Common fields
  const userUpdates = {};

  if (updates.name !== undefined)
    userUpdates.name = updates.name;

  if (updates.bio !== undefined)
    userUpdates.bio = updates.bio;

  if (updates.avatarUrl !== undefined)
    userUpdates.avatarUrl = updates.avatarUrl;

  await User.findByIdAndUpdate(
    userId,
    userUpdates,
    { new: true }
  );

  let profile;

  if (user.role === "entrepreneur") {
    profile =
      await EntrepreneurProfile.findOneAndUpdate(
        { user: userId },
        {
          startupName: updates.startupName,
          pitchSummary: updates.pitchSummary,
          fundingNeeded: updates.fundingNeeded,
          industry: updates.industry,
          location: updates.location,
          foundedYear: updates.foundedYear,
          teamSize: updates.teamSize,
        },
        {
          new: true,
        }
      );
  }

  if (user.role === "investor") {
    profile =
      await InvestorProfile.findOneAndUpdate(
        { user: userId },
        {
          investmentInterests:
            updates.investmentInterests,
          investmentStage:
            updates.investmentStage,
          portfolioCompanies:
            updates.portfolioCompanies,
          totalInvestments:
            updates.totalInvestments,
          minimumInvestment:
            updates.minimumInvestment,
          maximumInvestment:
            updates.maximumInvestment,
        },
        {
          new: true,
        }
      );
  }

  const updatedUser = await User.findById(userId);

  return {
    user: updatedUser,
    profile,
  };
};