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
    }
});

timeinSchema.statics.saveOut = async function (data, id) {
    const newData = this.create({...data, userId: id});
    return newData;
}

timeinSchema.statics.getData = async function (userId) {
    const data = this.find({userId});
    return data;
}

const TimeinOut = mongoose.model('timeinout', timeinSchema);

export default TimeinOut;
