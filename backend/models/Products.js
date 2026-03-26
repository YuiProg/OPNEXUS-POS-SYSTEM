import mongoose from 'mongoose';
import Strings from '../strings/strings-codes.js';

const {
    FAILED_ADD,
    BRANCH_LOC_FAIL,
    SERVER_ERROR,
    PRICE_ERR,
    CATEG_ERR
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
    category: {
        type: String,
        required: [true, CATEG_ERR]
    },
    price: {
        type: Number,
        required: [true, PRICE_ERR]
    },
    createdById: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    creatorImage: {
        type: String,
        required: false
    },
    creatorName: {
        type: String,
        required: true
    },
    productBranch: {
        type: String,
        required: [true, BRANCH_LOC_FAIL]
    },
    productImage: {
        type: String,
        required: false
    },
    productImageId: {
        type: String,
        required: false
    }
}, {timestamps: true});

productSchema.statics.addProduct = async function (data, user) {
    if (!user) {
        return new Error(SERVER_ERROR);
    }
    const newProduct = await this.create({...data, createdById: user.userId});
    return newProduct;
}

productSchema.statics.fetchProducts = async function (selectedBranch) {
    if (selectedBranch !== "any") {
        const productByBranch = await this.find({productBranch: selectedBranch});
        return productByBranch;
    }
    const products = await this.find({}).sort({createdAt: -1});
    return products;
}


const Product = mongoose.model('product', productSchema);

export default Product;