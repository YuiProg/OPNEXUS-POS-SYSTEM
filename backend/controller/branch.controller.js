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
        console.log(data);
        //const fetchUser = await User.getUserByUsername(data.clerk);

        const payload = {
            location: data.location,
            clerks: data.clerks
        }

        //update clerk's branches

        const clerks = data.clerks;
        
        for (let i = 0; i < clerks.length; i++) {
            await User.updateUser(clerks[i].Id, {branchLocation: data.location});

            if (clerks[i].branchLocation != null) {
                return ApiResponseModel(res, ERROR, `${clerks[i].Username} already has a branch!`);
            }
        }

        //console.log(payload);
        const newbranch = await Branch.addBranch(payload);
        ApiResponseModel(res, CREATED, NEW_BRANCH, newbranch);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const updateBranch = async (req, res) => {
    try {
        const { location } = req.params;
        const data = req.body;
        const user = await User.getSingleUser(data.Id);
        if (user.branchLocation !== null) {
            await Branch.removeUserFromOldBranch(user.branchLocation, data);
        }
         const updateUser = await User.updateUser(data.Id, {branchLocation: location});
        //console.log(user)
        const updatedBranch = await Branch.updateBranch(location, data);
        ApiResponseModel(res, SUCCESS, GET_BRANCH, {updatedBranch, updateUser});
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

export const getBranchByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const branch = await Branch.getBranchByLocation(location);
        ApiResponseModel(res, SUCCESS, GET_BRANCH, branch);
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