import { STATUS } from "../constants/statusCodes.js";
import { successResponse, errorResponse } from "../helpers/response.helper.js";
import { updateUserProfile } from "../services/users.service.js";

export const updateProfile = async (req, res) => {
  try {
    const data = await updateUserProfile(
      req.user._id,
      req.body
    );

    successResponse(res, data, STATUS.OK);
  } catch (error) {
    errorResponse(
      res,
      error.message,
      error.statusCode || STATUS.SERVER_ERROR
    );
  }
};