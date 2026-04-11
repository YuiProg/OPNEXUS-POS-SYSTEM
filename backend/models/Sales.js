import mongoose from 'mongoose'

const salesSchema = new mongoose.Schema({
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
    items: {
        type: Array,
        required: true,
        default: []
    },
    discount: {
        type: String,
        default: 'No'
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
});

salesSchema.statics.createSale = async function (data) {
    const newSale = await this.create(data);
    return newSale;
}

const Sales = mongoose.model('sales', salesSchema);

export default Sales;