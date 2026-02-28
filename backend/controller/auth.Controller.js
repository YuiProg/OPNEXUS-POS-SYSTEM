import generateToken from "../lib/generateToken.js";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
    try {
        const createdUser = await User.registerUser(req.body);
        res.status(201).json({status: 'success', user: createdUser});
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.loginUser(username, password);
        
        const {password: _, ...userWithoutPassword} = user.toObject();
        generateToken(user._id, res);
        res.status(200).json({status: 'success', user: userWithoutPassword});
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
}