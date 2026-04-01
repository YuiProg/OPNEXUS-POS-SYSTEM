import ApiResponseModel from "../models/ApiResponseModel.js";
import Branch from "../models/Branches.js";
import User from "../models/UserModel.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    CREATED,
    NEW_BRANCH,
    SUCCESS,
    GET_BRANCH
} = Strings;

export const addBranches = async (req, res) => {
    try {
        const data = req.body;
        //const {userId} = req.user;

        const fetchUser = await User.getUserByUsername(data.clerk);

        const payload = {
            clerkName: data.clerk,
            location: data.location,
            clerkId: fetchUser._id,
            session: fetchUser.shift,
            role: fetchUser.role
        }
        //console.log(payload);
        const newbranch = await Branch.addBranch(payload);
        ApiResponseModel(res, CREATED, NEW_BRANCH, newbranch);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getBranch = async (req, res) => {
    try {
        const branches = await Branch.getBranch();
        ApiResponseModel(res, SUCCESS, GET_BRANCH, branches);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const setActiveBranch = async (req, res) => {
    const { location } = req.params;
    try {
        const updated = await Branch.setActive(location);
        ApiResponseModel(res, SUCCESS, 'Updated branch', updated);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const setOfflineBranch = async (req, res) => {
    const {location} = req.params;
    try {
        const updated = await Branch.setOffline(location);
        ApiResponseModel(res, SUCCESS, 'Updated branch', updated);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}