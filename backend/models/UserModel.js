import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'A user already has this username'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    branchLocation: {
        type: String,
        required: [true, 'Branch location is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
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
    if (!this.isModified('password')) return;
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
        throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid username or password');
    }
    return user;
}

const User = mongoose.model('User', userSchema);

export default User;