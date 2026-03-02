import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Strings from "../strings/strings.js";

const {
    BRANCH_REQ,
    PASS_REQ,
    ROLE_REQ,
    NAME_EXIST,
    CRED_ERROR,
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
    role: {
        type: String,
        required: [true, ROLE_REQ],
        default: 'Clerk',
    },
    profilePicURL: {
        type: String,
        //required: [true, 'Profile picture is required'],
    },
    profilePicId: {
        type: String,
        //required: true
    }
});

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

const User = mongoose.model(us, userSchema);

export default User;