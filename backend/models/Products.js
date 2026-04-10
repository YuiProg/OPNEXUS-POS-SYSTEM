import mongoose from 'mongoose';
import Strings from '../strings/strings-codes.js';
import { customAlphabet } from 'nanoid';
import cloudinary from '../lib/cloudinary.js';

const {
    FAILED_ADD,
    BRANCH_LOC_FAIL,
    SERVER_ERROR,
    PRICE_ERR,
    CATEG_ERR,
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 5);

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `PROD-${nanoid()}`
    },
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
        type: String,
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

    if (data.image !== null && data.image !== undefined) {
        await cloudinary.uploader.upload(data.image, {folder: 'vaporya-products'})
        .then((result) => {
            data.productImage = result.secure_url;
            data.productImageId = result.public_id;
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
            throw new Error(SERVER_ERROR);
        });
    }
    const newProduct = await this.create({...data, createdById: user.userId});
    return newProduct;
}

productSchema.statics.fetchSingle = async function (id) {
    const product = await this.find({_id: id});
    return product;
}

productSchema.statics.updateProduct = async function (id, data) {
    
    if (typeof data.image === "string" && data.image.includes("data:image")) {
        const updateProductImage = await cloudinary.uploader.upload(data.image);
        data.productImage = updateProductImage.secure_url;
        data.productImageId = updateProductImage.public_id;
    } 
    
    const updatedProduct = await this.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
}

productSchema.statics.fetchProducts = async function (selectedBranch) {
    if (selectedBranch !== 'any') {
        const productByBranch = await this.find({productBranch: selectedBranch});
        return productByBranch;
    }
    const products = await this.find({}).sort({createdAt: -1});
    return products;
}

productSchema.statics.deleteSingle = async function (id) {
    const result = await this.deleteOne({_id: id});
    return result;
}

productSchema.statics.deleteMultiple = async function (list) {
    const result = await this.deleteMany({_id: {$in: list}});
    return result;
}

const Product = mongoose.model('product', productSchema);

export default Product;