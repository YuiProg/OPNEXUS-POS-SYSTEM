import generateToken from "../lib/generateToken.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import User from "../models/UserModel.js";
import Strings from "../strings/strings-codes.js";

const {
    SUCCESS_MESS,
    SUCCESS,
    ERROR_MESS,
    ERROR,
    CREATED,
    USER_LOGOUT
} = Strings;

export const register = async (req, res) => {
    try {
        const data = req.body;
        
        const createdUser = await User.registerUser(data);
        ApiResponseModel(res, CREATED, SUCCESS_MESS, createdUser);
    } catch (error) {
        ApiResponseModel(res, error.message, ERROR);
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.loginUser(email, password);
        
        const {password: _, ...userWithoutPassword} = user.toObject();
        generateToken(user._id, res);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, userWithoutPassword);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const {id} = req.params;
        const oldModel = await User.getSingleUser(id);
        if (!oldModel) {
            return ApiResponseModel(res, ERROR, "User not found");
        }
        const updated_user = await User.updateUser(id, data);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, updated_user, oldModel);
    } catch (error) {
        ApiResponseModel(res, error.message, ERROR);
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0});
    //res.status(SUCCESS).json({status: SUCCESS_MESS, message: USER_LOGOUT});
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS);
}

export const getAuthUser = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.getUser(userId);

        //const {password: _, ...userWithoutPassword} = user.toObject();
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.getSingleUser(id);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.getUsers();
        const usersWithFullName = users.map((user) => ({
            Id: user._id,
            Username: user.username,
            Employee: [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ").toUpperCase(),
            ...user._doc
        }));
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, usersWithFullName);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}



export const deleteMultiple = async (req, res) => {
    try {
        const list = req.body;
        const result = await User.deleteMultiple(list);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteSingle = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await User.deleteSingleUser(id);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}