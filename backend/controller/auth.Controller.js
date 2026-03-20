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
        const createdUser = await User.registerUser(req.body);
        ApiResponseModel(res, CREATED, SUCCESS_MESS, createdUser);
    } catch (err) {
        ApiResponseModel(res, error.message, ERROR);
    }
}

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.loginUser(username, password);
        
        const {password: _, ...userWithoutPassword} = user.toObject();
        generateToken(user._id, res);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, userWithoutPassword);
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
        const {_id} = req.user;
        console.log(req.user);
        const user = await User.getUser(_id);

        const {password: _, ...userWithoutPassword} = user.toObject();
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, userWithoutPassword);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}