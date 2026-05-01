import ApiResponseModel from "../models/ApiResponseModel.js";
import Branch from "../models/Branches.js";
import SystemLogs from "../models/SystemLogs.js";
import User from "../models/UserModel.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    CREATED,
    NEW_BRANCH,
    SUCCESS,
    GET_BRANCH,
    CREATEDBRANCH,
    DELETEBRANCH,
    EDITBRANCH
} = Strings;


//hello programmer, kung nakikita moto
//I have a feeling that this function is bound to destroy the system sooner or later.
//So kung i-try mo man i optimize to and nag fail (panigurado)
//pa increment nalang ng number sa baba thanks!
//total hours wasted in this controller = 34
export const addBranches = async (req, res) => {
    try {
        const data = req.body;
        const {userId} = req.user;
        const fetchUser = await User.getUser(userId);

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

        const logPayload= {
            user: fetchUser.username,
            action: CREATEDBRANCH,
            branchLocation: fetchUser.branchLocation,
            log: `${fetchUser.username} created a new branch called ${data.location}`
        }

        await SystemLogs.addLog(logPayload);

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
        const { userId } = req.user;
        const data = req.body;

        const user = await User.getSingleUser(data.Id);
        const userData = await User.getUser(userId);
        if (user.branchLocation !== "N/A") {
            await Branch.removeUserFromOldBranch(user.branchLocation, data);
        }

        const updateUser = await User.updateUser(user._id, { branchLocation: location });
        const updatedBranch = await Branch.updateBranch(location, data);

        const logPayload = {
            user: userData.username,
            action: EDITBRANCH,
            branchLocation: userData.branchLocation,
            log: `${userData.username} updated the branch ${location} and added ${data.Username} to the branch`
        }

        await SystemLogs.addLog(logPayload);

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
        
        //const fetchUser = await User.getSingleUser(data._id);
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
        const {userId} = req.user;
        const data = req.body;
        const user = await User.getSingleUser(data.Id);
        const userData = await User.getUser(userId);
        console.log('User data' + user);
        if (user.timedIn) {
            return ApiResponseModel(res, ERROR, 'User is currently timed in!');
        }
        const updatedUser = await User.updateUser(user._id, {branchLocation: 'N/A'});
        const updatedBranch = await Branch.removeUserFromOldBranch(location, data);

        const logPayload = {
            user: userData.username,
            action: DELETEBRANCH,
            branchLocation: userData.branchLocation,
            log: `${userData.username} removed ${data.Username} from the branch ${location}`
        }
        await SystemLogs.addLog(logPayload);

        ApiResponseModel(res, SUCCESS, `Removed ${data.Username} from this branch`, {updatedBranch, updatedUser});
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const removeAdminFromBranch = async (req, res) => {
    try {
        const { location } = req.params;
        const data = req.body;
        const updatedBranch = await Branch.removeUserFromOldBranch(location, {Id: data._id});
        const updatedUser = await User.updateUser(data._id, {branchLocation: 'N/A'});
        ApiResponseModel(res, SUCCESS, 'Updated branch', {updatedUser, updatedBranch});
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteBranch = async (req, res) => {
    try {
        const {location} = req.params;
        const { userId } = req.user;
        const fetchUser = await User.getUser(userId);
        const data = req.body;

        const clerks = data.clerks;

        for (let i = 0; i < clerks.length; i++) {
            const user = await User.getSingleUser(clerks[i].Id);
            await User.updateUser(user._id, {branchLocation: 'N/A'});
        }

        const removedBranch = await Branch.deleteBranch(location);

        const logPayload = {
            user: fetchUser.username,
            action: DELETEBRANCH,
            branchLocation: fetchUser.branchLocation,
            log: `${fetchUser.username} deleted the branch called ${location}`
        }  

        await SystemLogs.addLog(logPayload);

        ApiResponseModel(res, SUCCESS, 'Branch removed', removedBranch);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}