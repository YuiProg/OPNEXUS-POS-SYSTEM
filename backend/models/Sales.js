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
    amountChange: {
        type: Number,
        required: String
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
    tota: {
        type: Number,
        required: true
    }
});

const Sales = mongoose.model('sales', salesSchema);

export default Sales;