
import { STATUS } from "../constants/statusCodes.js";
import { errorResponse } from "../helpers/response.helper.js";

export const errorHandler = (err, req, res, next) => {
    return errorResponse(
        res,
        err.message,
        err.statusCode || STATUS.SERVER_ERROR
    );
};