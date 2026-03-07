import mongoose from 'mongoose';
import Strings from '../strings/strings.js';

const {
    FAILED_ADD,
    BRANCH_LOC_FAIL
} = Strings;

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, FAILED_ADD]
    },
    quantity: {
        type: Number,
        default: 1
    },
    createdById: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    creatorImage: {
        type: String,
        required: true
    },
    productBranch: {
        type: String,
        required: [true, BRANCH_LOC_FAIL]
    },
    productImage: {
        type: String
    },
    productImageId: {
        type: String,
        required: true
    }
}, {timestamps: true});

productSchema.statics.addProduct = async function (data) {
    const newProduct = await this.create(data);
    return newProduct;
}


const Product = mongoose.model('product', productSchema);

export default Product;