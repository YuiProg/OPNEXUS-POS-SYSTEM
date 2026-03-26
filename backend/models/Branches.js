import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    clerkName: {
        type: String,
        required: false
    },
    clerkId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    location: {
        type: String,
        requried: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

branchSchema.statics.addBranch = async function (data) {
    const newBranch = await this.create(data);
    return newBranch;
}

branchSchema.statics.getBranch = async function () {
    const branches = await this.find({});
    return branches;
}

const Branch = mongoose.model('branch', branchSchema);

export default Branch;

