import ApiResponseModel from "../models/ApiResponseModel.js";
import Branch from "../models/Branches.js";
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
        //const user = req.user;
        const newbranch = await Branch.addBranch(data);
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