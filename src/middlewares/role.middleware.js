import { STATUS } from "../constants/statusCodes.js";
import { errorResponse } from "../helpers/response.helper.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return errorResponse(
                res,
                "Access denied: insufficient permissions",
                STATUS.FORBIDDEN
            );
        }

        next();
    };
};