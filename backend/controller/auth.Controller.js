import generateToken from "../lib/generateToken.js";
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
        res.status(CREATED).json({status: SUCCESS_MESS, user: createdUser});
    } catch (err) {
        res.status(ERROR).json({status: ERROR_MESS, message: err.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.loginUser(username, password);
        
        const {password: _, ...userWithoutPassword} = user.toObject();
        generateToken(user._id, res);
        res.status(SUCCESS).json({status: SUCCESS_MESS, user: userWithoutPassword});
    } catch (error) {
        res.status(ERROR).json({status: ERROR_MESS, message: error.message});
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.status(SUCCESS).json({status: SUCCESS_MESS, message: USER_LOGOUT});
}

export const getAuthUser = async (req, res) => {
    try {
        const {_id} = req.user;
        console.log(req.user);
        const user = await User.getUser(_id);

        const {password: _, ...userWithoutPassword} = user.toObject();

        res.status(SUCCESS).json({success: SUCCESS_MESS, data: userWithoutPassword});
    } catch (error) {
        res.status(ERROR).json({status: ERROR_MESS, message: error.message});
    }
}