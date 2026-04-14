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
}, {_id: false});

vipSchema.pre('save', async function () {
    if (this.isNew) {
        try {
            const count = await this.constructor.countDocuments();
            this._id = String(count + 1).padStart(4, '0');
        } catch (error) {
            throw error; 
        }
    }
});


vipSchema.statics.addVip = async function (data) {
    const newVip = await this.create(data);
    return newVip;
};

vipSchema.statics.getVipById = async function (id) {
    const getVip = await this.find({_id: id});
    return getVip;
}


const Vip = mongoose.model('Vip', vipSchema);
export default Vip;