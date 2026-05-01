import mongoose from "mongoose";

/**
 * @model 
 */
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
    },
    expirationDate: {
        type: Date,
        required: false
    },
}, {_id: false, timestamps: true});

vipSchema.pre('save', async function () {
    if (this.isNew) {
        if (!this._id) {
            const last = await this.constructor.findOne({}, { _id: 1 }).sort({ _id: -1 });
            const nextNumber = last ? parseInt(last._id, 10) + 1 : 1;
            this._id = String(nextNumber).padStart(5, '0');
        }
    }
});

vipSchema.statics.removePoints = async function (id, pointsUsed) {
    console.log(`REMOVED POINTS FOR ${id}`);
    const vip = await this.findOne({ _id: id });
    const newPoints = Math.max(0, (vip.points || 0) - pointsUsed);
    const removedPoints = await this.findOneAndUpdate(
        { _id: id },
        { $set: { points: newPoints } },
        { new: true }
    );
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
    if (!data.expirationDate) {
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        data.expirationDate = oneYearFromNow;
    }
    const newVip = await this.create(data);
    return newVip;
};

vipSchema.statics.updateVip = async function (id, data) {
    const newVip = await this.findOneAndUpdate({_id: id}, data, {new: true});
    return newVip;
}

vipSchema.statics.getVipById = async function (id) {
    const vip = await this.findOne({ _id: id });
    if (!vip) return null;

    const now = new Date();
    if (vip.expirationDate && vip.expirationDate <= now && vip.status !== 'INACTIVE') {
        vip.status = 'INACTIVE';
        await vip.save();
    }

    return [vip];
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