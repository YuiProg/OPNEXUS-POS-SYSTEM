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
    clerks: {
        type: Array,
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
    const updatedBranch = await this.findOneAndUpdate({location}, {
        $addToSet: {
            clerks: {
                Id: data.Id,
                Username: data.Username,
                email: data.email,
                shift: data.shift,
                salary: data.salary,
                role: data.role,
                phoneNumber: data.phoneNumber,
                timedIn: 'INACTIVE'
            }
        }
    }, {new: true});
    return updatedBranch;
}

branchSchema.statics.updateUserInBranch = async function (userId, location, newUser) {
    const updatedBranch = await this.findOneAndUpdate(
        {
            location, 
            'clerks.Id': userId 
        },          
        {
            $set: {
                'clerks.$.Username':     newUser.username,
                'clerks.$.email':        newUser.email,
                'clerks.$.shift':        newUser.shift,
                'clerks.$.salary':       newUser.salary,
                'clerks.$.role':         newUser.role,
                'clerks.$.phoneNumber':  newUser.phoneNumber,
                'clerks.$.timedIn': 'INACTIVE'
            }
        },
        { new: true }
    );
    return updatedBranch;
}

branchSchema.statics.removeUserFromOldBranch = async function (location, data) {
    await this.findOneAndUpdate({location}, {
        $pull: {
            clerks: {Id: data.Id}
        }
    });
}

branchSchema.statics.setActive = async function (location, data) {
    const res = await this.findOneAndUpdate(
        { 
            location: location,
            "clerks.Id": data._id  
        },
        { 
            $set: { 
                "clerks.$.timedIn": 'ACTIVE'
            } 
        },
        { new: true }
    );
    return res;
}

branchSchema.statics.setOffline = async function (location, data) {
    const res = await this.findOneAndUpdate(
        { 
            location: location,
            "clerks.Id": data._id
        },
        { 
            $set: { 
                "clerks.$.timedIn": 'INACTIVE'
            } 
        },
        { new: true }
    );
    return res;
}

branchSchema.statics.deleteBranch = async function (location) {
    const res = await this.deleteOne({location});
    return res;
}

// branchSchema.statics.removeUserFromBranch = async function (location, data) {

// }


const Branch = mongoose.model('branch', branchSchema);

export default Branch;

