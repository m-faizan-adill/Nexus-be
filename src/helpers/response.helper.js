import { STATUS } from "../constants/statusCodes.js";

export const successResponse = (res, data, statusCode = STATUS.OK) => {
    return res.status(statusCode).json({
        success: true,
        ...data,
    });
};

export const errorResponse = (res, message, statusCode = STATUS.SERVER_ERROR) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};