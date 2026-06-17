import { STATUS } from "../constants/statusCodes.js";
import { errorResponse, successResponse } from "../helpers/response.helper.js";
import { registerUser, loginUser, getUser, forgotPassword, resetPassword } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const data = await registerUser(req.body);
        successResponse(res, data, STATUS.CREATED);
    } catch (error) {
        errorResponse(res, error.message, error.statusCode || STATUS.SERVER_ERROR);
    }
};

export const login = async (req, res) => {
    try {
        const data = await loginUser(req.body);
        successResponse(res, data, STATUS.OK);
    } catch (error) {
        errorResponse(res, error.message, error.statusCode || STATUS.SERVER_ERROR);
    }
};

export const getMe = async (req, res) => {
    try {
        const data = await getUser(req.user._id);
        successResponse(res, data, STATUS.OK);
    } catch (error) {
        errorResponse(res, error.message, error.statusCode || STATUS.SERVER_ERROR);
    }
};

export const forgotPasswordHandler = async (req, res) => {
    try {
        const data = await forgotPassword(req.body);
        successResponse(res, data, STATUS.OK);
    } catch (error) {
        errorResponse(res, error.message, error.statusCode || STATUS.SERVER_ERROR);
    }
};

export const resetPasswordHandler = async (req, res) => {
    try {
        const data = await resetPassword(req.body);
        successResponse(res, data, STATUS.OK);
    } catch (error) {
        errorResponse(res, error.message, error.statusCode || STATUS.SERVER_ERROR);
    }
};