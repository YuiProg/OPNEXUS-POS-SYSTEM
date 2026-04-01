import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import Strings from "../strings/strings-codes.js";

const {
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 5);

const branchSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `BR-${nanoid()}`
    },
    clerkName: {
        type: String,
        required: false,
    },
    clerkId: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: false
    },
    session: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: false,
        required: false
    }
});

branchSchema.statics.addBranch = async function (data) {
    const newBranch = await this.create(data);
    return newBranch;
}

branchSchema.statics.getBranch = async function () {
    const branches = await this.find();
    return branches;
}

branchSchema.statics.getBranchByLocation = async function (location) {
    const branch = await this.findOne({location});
    return branch;
}

branchSchema.statics.updateBranch = async function (location, data) {
    const updatedBranch = await this.findOneAndUpdate({location}, data, {new: true});
    return updatedBranch;
}

branchSchema.statics.setActive = async function (location) {
    const res = await this.findOneAndUpdate({location}, {active: true}, {new: true});
    return res;
}

branchSchema.statics.setOffline = async function (location) {
    const res = await this.findOneAndUpdate({location}, {active: false}, {new: false});
    return res;
}


const Branch = mongoose.model('branch', branchSchema);

export default Branch;

