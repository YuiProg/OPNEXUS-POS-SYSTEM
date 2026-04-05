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


//hello programmer, kung nakikita moto
//I have a feeling that this function is bound to destroy the system sooner or later.
//So kung i-try mo man i optimize to and nag fail (panigurado)
//pa increment nalang ng number sa baba thanks!
//total hours wasted in this controller = 34
export const addBranches = async (req, res) => {
    try {
        const data = req.body;
        //const {userId} = req.user;
        console.log(data);
        //const fetchUser = await User.getUserByUsername(data.clerk);

        const payload = {
            location: data.location,
            clerks: data.clerks.map(clerk => ({ ...clerk, timedIn: 'INACTIVE' }))
        }

        //update clerk's branches

        const clerks = data.clerks;
        //console.log(clerks);
        for (let i = 0; i < clerks.length; i++) {
            if (clerks[i].branchLocation != "N/A") {
                return ApiResponseModel(res, ERROR, `${clerks[i].Username} already has a branch!`);
            }
            try {
                await User.updateUser(clerks[i].Id, {branchLocation: data.location});   
            } catch (error) {
                ApiResponseModel(res, ERROR, error.message);
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
        
        if (user.branchLocation !== "N/A") {
            await Branch.removeUserFromOldBranch(user.branchLocation, data);
        }

        const updateUser = await User.updateUser(user._id, { branchLocation: location });
        const updatedBranch = await Branch.updateBranch(location, data);

        ApiResponseModel(res, SUCCESS, GET_BRANCH, { updatedBranch, updateUser });
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
};

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
    const data = req.body;
    try {
        
        const fetchUser = await User.getSingleUser(data._id);
        const updated = await Branch.setActive(location, data);
        ApiResponseModel(res, SUCCESS, 'Branch Actived', updated);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const setOfflineBranch = async (req, res) => {
    const {location} = req.params;
    const user = req.body;
    try {
        const fetchUser = await User.getSingleUser(user._id);
        const updated = await Branch.setOffline(location, fetchUser);
        ApiResponseModel(res, SUCCESS, 'Updated branch', updated);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const removeUserFromBranch = async (req, res) => {
    try {
        const {location} = req.params;
        const data = req.body;
        const user = await User.getSingleUser(data.Id);

        const updatedUser = await User.updateUser(user._id, {branchLocation: 'N/A'});
        const updatedBranch = await Branch.removeUserFromOldBranch(location, data);

        ApiResponseModel(res, SUCCESS, `Removed ${data.Username} from this branch`, {updatedBranch, updatedUser});
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}