import mongoose from "mongoose";

const vipSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
    contactNo: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    }
}, {_id: false, timestamps: true});

vipSchema.pre('save', async function () {
    if (this.isNew) {
        try {
            const last = await this.constructor.findOne({}, { _id: 1 }).sort({ _id: -1 });
            const nextNumber = last ? parseInt(last._id, 10) + 1 : 1;
            this._id = String(nextNumber).padStart(4, '0');
        } catch (error) {
            throw error;
        }
    }
});

vipSchema.statics.removePoints = async function (id) {
    console.log(`REMOVED POINTS FOR ${id}`);
    const removedPoints = await this.findOneAndUpdate({_id: id}, {points: 0});
    return removedPoints;
}

vipSchema.statics.addVipPoints = async function(id, points) {
    console.log(`ADDED ${points} POINTS FOR ${id}`);
    const updatedVip = await this.findOneAndUpdate(
        { _id: id },
        { $inc: { points: points } }, 
        { new: true }
    );
    return updatedVip;
}
vipSchema.statics.addVip = async function (data) {
    const newVip = await this.create(data);
    return newVip;
};

vipSchema.statics.updateVip = async function (id, data) {
    const newVip = await this.findOneAndUpdate({_id: id}, data, {new: true});
    return newVip;
}

vipSchema.statics.getVipById = async function (id) {
    const getVip = await this.find({_id: id});
    return getVip;
}

vipSchema.statics.getAllVip = async function () {
    const allVips = await this.find({}).sort({createdAt: -1});
    return allVips;
}

vipSchema.statics.deleteVip = async function (id) {
    const deleteVip = await this.deleteOne({_id: id});
    return deleteVip;
}

const Vip = mongoose.model('Vip', vipSchema);
export default Vip;