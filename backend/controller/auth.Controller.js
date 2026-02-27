import User from "../models/UserModel.js";

export const register = async (req, res) => {
    try {
        const createdUser = await User.registerUser(req.body);
        res.status(201).json({status: 'success', user: createdUser});
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
}