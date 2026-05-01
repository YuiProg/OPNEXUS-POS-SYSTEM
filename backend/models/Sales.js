import mongoose from 'mongoose'
import Strings from '../strings/strings-codes.js';
import { customAlphabet } from 'nanoid';

const {
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 4);

/**
 * @model 
 */
const salesSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `SL-${nanoid()}`
    },
    clerkName: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    itemSold: {
        type: Number,
        required: true,
        default: 0
    },
    branchLocation: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
        default: []
    },
    vip: {
        type: String,
        default: 'No'
    },
    usedDiscount: {
        type: String,
        default: 'No'
    },
    discountAmount: {
        type: Number,
    },
    pointsEarned: {
        type: Number,
    },
    purchasedBy: {
        type: Object,
        required: false
    },
    dateTime: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
    }
}, {timestamps: true});

salesSchema.statics.createSale = async function (data) {
    const newSale = await this.create(data);
    return newSale;
}

salesSchema.statics.getSales = async function (branch) {
    const hasBranch = branch && branch !== "null" && branch !== "Branch" && branch !== "any" ? { branchLocation: branch } : {};
    const sales = await this.find(hasBranch).sort({createdAt: -1});
    return sales;
}

salesSchema.statics.getSingle = async function (id) {
    const record = await this.find({_id: id}).sort({createdAt: -1});
    return record;
}

const Sales = mongoose.model('sales', salesSchema);

export default Sales;