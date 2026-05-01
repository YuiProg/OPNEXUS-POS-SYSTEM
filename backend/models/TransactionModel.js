import mongoose from "mongoose";

/**
 * @model 
 */
const transactionSchema = new mongoose.Schema({
    clerk: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    log: {
        type: String,
        required: true
    }
});

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;