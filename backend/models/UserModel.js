import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import Strings from "../strings/strings-codes.js";
import { customAlphabet } from 'nanoid'

const {
    BRANCH_REQ,
    PASS_REQ,
    ROLE_REQ,
    CRED_ERROR,
    USER_NOT_EXIST,
    SHIFT_ERR,
    SALARY_ERR,
    FNAME_ERR,
    LNAME_ERR,
    GEND_ERR,
    PNUM_ERR,
    ADDR_ERR,
    ID_SECRET,
    EMAIL_ERR,
    pw,
    us
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 5);

/**
 * @model 
 */
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `US-${nanoid()}`
    },
    email: {
        type: String,
        required: [true, EMAIL_ERR]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, PASS_REQ],
    },
    branchLocation: {
        type: String,
        required: [false, BRANCH_REQ],
    },
    shift: {
        type: String,
        required: [true, SHIFT_ERR],
    },
    salary: {
        type: Number,
        required: [true, SALARY_ERR] 
    },
    role: {
        type: String,
        required: [true, ROLE_REQ],
    },
    firstName: {
        type: String,
        required: [true, FNAME_ERR]
    },
    middleName: {
        type: String,
        required: false,
        default: ''
    },
    lastName: {
        type: String,
        required: [true, LNAME_ERR]
    },
    gender: {
        type: String,
        required: [true, GEND_ERR],
    },
    phoneNumber: {
        type: Number,
        required: [true, PNUM_ERR],
        minLength: 10,
        maxLength: 10
    },
    address: {
        type: String,
        required: [true, ADDR_ERR]
    },
    timedIn: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        required: false
    }
}, {timestamps: true});

userSchema.pre('save', async function () {
    if (!this.isModified(pw.toLocaleLowerCase())) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.registerUser = async function (data) {
    const createdUser = await this.create(data);
    return createdUser;
}

userSchema.statics.loginUser = async function (email, password) {
    const user = await this.findOne({ email }).select('-password');
    const userPassword = await this.findOne({email});
    if (!user) {
        throw new Error(CRED_ERROR);
    }
    const isMatch = await bcrypt.compare(password, userPassword.password);
    if (!isMatch) {
        throw new Error(CRED_ERROR);
    }
    return user;
}

userSchema.statics.updateUser = async function (id, data) {
    const updatedUser = await this.findByIdAndUpdate(id, data, {new: true}).select("-password");
    
    // if (!mongoose.Types.ObjectId.isValid(new Types.ObjectId(id))) {
    //     throw new Error(INVALID_ID);
    // }

    return updatedUser;
}

userSchema.statics.getUser = async function (_id) {
    const user = await this.findOne({_id}).select("-password");

    //check if valid ba yung id sa protected route
    //new types.objectid(id)
    //since string yung nirereturn na id i coconvert natin siya to mongoose id

    //REMOVED NATO SINCE CUSTOM ID NA ANG GAMIT NATIN
    // if (!mongoose.Types.ObjectId.isValid(new Types.ObjectId(_id))) {
    //     throw new Error(INVALID_ID);
    // }
    //pag walang na return na user hindi naman to gagana kasi may checker na sa taas HAHAHA
    if (!user) {
        throw new Error(USER_NOT_EXIST);
    }
    return user;
}

userSchema.statics.getUsers = async function (branch) {
    const checkBranch = branch ? { branchLocation: branch } : {};
    const users = await this.find(checkBranch).sort({ createdAt: -1 }).select("-password");
    return users;
}

userSchema.statics.getSingleUser = async function (id) {
    const user = await this.findOne({_id: id}).select("-password");
    if (!user) {
        throw new Error(USER_NOT_EXIST);
    }
    return user;
}

userSchema.statics.getUserByUsername = async function (username) {
    const user = await this.findOne({username: username});
    return user;
}

userSchema.statics.deleteMultiple = async function (data) {
    const result = await this.deleteMany({_id: {$in: data}});
    return result;
}

userSchema.statics.getUsersById = async function (data) {
    const result = await this.find({_id: {$in: data}});
    return result;
}

userSchema.statics.deleteSingleUser = async function (id) {
    const result = await this.deleteOne({_id: id});
    return result;
}

userSchema.statics.changePassword = async function (id, newPassword, oldPassword) {
    const user = await this.findById(id);
    if (!user) {
        throw new Error(USER_NOT_EXIST);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error(CRED_ERROR);
    }

    user.password = newPassword;
    await user.save(); // triggers pre-save hook
    return await this.findById(id).select("-password");
}

const User = mongoose.model(us, userSchema);

export default User;