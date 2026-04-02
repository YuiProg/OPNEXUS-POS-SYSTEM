import mongoose from "mongoose";


const timeinSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    clockIn: {
        type: String,
        required: true
    },
    clockOut: {
        type: String,
        required: false
    },
    totalHours: {
        type: Number,
        required: false
    }
}, {timestamps: true});

timeinSchema.statics.getAllData = async function () {
    const data = await this.find({});
    return data;
}

timeinSchema.statics.saveOut = async function (data, id) {
    const newData = await this.create({...data, userId: id});
    return newData;
}

timeinSchema.statics.getData = async function (userId) {
    const data = await this.find({userId}).sort({createdAt: -1});
    return data;
}

const TimeinOut = mongoose.model('timeinout', timeinSchema);

export default TimeinOut;
