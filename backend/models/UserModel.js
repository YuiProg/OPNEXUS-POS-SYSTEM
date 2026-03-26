import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt';
import Strings from "../strings/strings-codes.js";
import { updateUser } from "../controller/auth.Controller.js";

const {
    BRANCH_REQ,
    PASS_REQ,
    ROLE_REQ,
    NAME_EXIST,
    CRED_ERROR,
    USER_NOT_EXIST,
    INVALID_ID,
    SHIFT_ERR,
    pw,
    us
} = Strings;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, NAME_EXIST],
    },
    password: {
        type: String,
        required: [true, PASS_REQ],
    },
    branchLocation: {
        type: String,
        required: [true, BRANCH_REQ],
    },
    shift: {
        type: Number,
        required: [true, SHIFT_ERR],
        default: 24,
        minLength: 1,
        maxLength: 24
    },
    gender: {
        type: String,
        required: [true]
    },
    salary: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: [true, ROLE_REQ],
        default: 'Clerk',
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        maxLength: 10
    },
    address: {
        type: String,
        required: true
    },
}, {timestamps: true});

userSchema.pre('save', async function () {
    if (!this.isModified(pw)) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.registerUser = async function (data) {
    const createdUser = await this.create(data);
    return createdUser;
}

userSchema.statics.loginUser = async function (username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error(CRED_ERROR);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error(CRED_ERROR);
    }
    return user;
}

userSchema.statics.updateUser = async function (id, data) {
    const updatedUser = await this.findByIdAndUpdate(id, data, {new: true}).select("-password");
    
    if (!mongoose.Types.ObjectId.isValid(new Types.ObjectId(id))) {
        throw new Error(INVALID_ID);
    }

    return updatedUser;
}

userSchema.statics.getUser = async function (_id) {
    const user = await this.findOne({_id}).select("-password");

    //check if valid ba yung id sa protected route
    //new types.objectid(id)
    //since string yung nirereturn na id i coconvert natin siya to mongoose id
    if (!mongoose.Types.ObjectId.isValid(new Types.ObjectId(_id))) {
        throw new Error(INVALID_ID);
    }
    //pag walang na return na user hindi naman to gagana kasi may checker na sa taas HAHAHA
    if (!user) {
        throw new Error(USER_NOT_EXIST);
    }
    return user;
}

const User = mongoose.model(us, userSchema);

export default User;