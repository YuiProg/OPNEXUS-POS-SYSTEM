import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    clerkName: {
        type: String,
        required: false
    },
    clerkId: {
        type: String,
        required: false
    },
    location: {
        type: String,
        requried: true,
        unique: [true, 'Location already exist']
    },
    role: {
        type: String,
        required: false
    },
    session: {
        type: String,
        required: true
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

