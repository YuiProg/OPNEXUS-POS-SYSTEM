import cloudinary from "../lib/cloudinary.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js"
import Strings from "../strings/strings-codes.js";
import { io } from "../lib/socket.js";
import User from "../models/UserModel.js";
import SystemLogs from "../models/SystemLogs.js";

const {
    ERROR,
    CREATED,
    NEW_PRODUCT,
    SUCCESS,
    SUCCESS_MESS,
    GET_PRODUCT,
    CREATEPRODUCT,
    DELETEPRODUCT,
    EDITPRODUCT,
    BAD_REQUEST
} = Strings;

export const validateProduct = async (req, res) => {
    try {
        const missingFields = [];
        const data = req.body;

        if (data.productName.trim() === ' ' || data.productName.length <= 0) {
            missingFields.push('Product Name');
        }

        if (data.price === 0) {
            missingFields.push('Price');
        }

        if (data.category.trim() === ' ' || data.category.length <= 0) {
            missingFields.push('Category');
        }

        if (data.productBranch.trim() === ' ' || data.productBranch.length <= 0) {
            missingFields.push('Branch');
        }

        if (missingFields.length >= 1) {
            return ApiResponseModel(res, BAD_REQUEST, 'Missing fields!', missingFields);
        }
        ApiResponseModel(res, CREATED, 'Validation successfull', data);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const newProduct = async (req, res) => {
    const data = req.body;
    const user = req.user;
    try {
        const newProduct = await Product.addProduct(data, user);
        
        const payload = {
            ...newProduct,
            userId: user.userId
        }

        const userData = await User.getUser(user.userId);

        const logPayload= {
            user: userData.username,
            action: CREATEPRODUCT,
            branchLocation: userData.branchLocation,
            log: `${userData.username} created a new product called ${data.productName}`
        }
        //console.log(logPayload);
        await SystemLogs.addLog(logPayload);

        io.emit("newProduct", payload);
        ApiResponseModel(res, CREATED, NEW_PRODUCT, newProduct);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}


export const fetchProducts = async (req, res) => {
    let branch = 'any';
    const {selectedBranch} = req.query;

    try {
        const products = await Product.fetchProducts(selectedBranch ? selectedBranch : branch);
        const cleanedData = products.map((data) => ({
            Id: data._id,
            Name: data.productName.toUpperCase(),
            Creator: data.creatorName,
            Branch: data.productBranch,
            ...data._doc
        }));
        ApiResponseModel(res, SUCCESS, NEW_PRODUCT, cleanedData);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteProductSingle = async (req, res) => {
    const { id } = req.body;
    const {userId} = req.user;
    try {
        const fetchProduct = await Product.fetchSingle(id);
        const product = fetchProduct[0]; 

        if (product && product.productImageId != null) {
            await cloudinary.uploader.destroy(product.productImageId);
        }

        const result = await Product.deleteSingle(id);
        const user = await User.getUser(userId);
        const logPayload = {
            user: user.username,
            action: DELETEPRODUCT,
            branchLocation: user.branchLocation,
            log: `${user.username} deleted a product called ${product.productName}`
        }
        await SystemLogs.addLog(logPayload);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteMultipleProducts = async (req, res) => {
    try {
        const list = req.body;
        const { userId } = req.user;
        const user = await User.getUser(userId);

        const products = await Promise.all(list.map(id => Product.fetchSingle(id)));

        for (const fetchedProduct of products) {
            const product = fetchedProduct[0];
            if (product && product.productImageId != null) {
                await cloudinary.uploader.destroy(product.productImageId);
            }
        }

        const result = await Product.deleteMultiple(list);

        for (const fetchedProduct of products) {
            const product = fetchedProduct[0];
            const logPayload = {
                user: user.username,
                action: DELETEPRODUCT,
                branchLocation: user.branchLocation,
                log: `${user.username} deleted a product called ${product.productName}`
            };
            await SystemLogs.addLog(logPayload);
        }

        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const fetchOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.fetchSingle(id);
        ApiResponseModel(res, SUCCESS, GET_PRODUCT, product);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {userId} = req.user;
    const data = req.body;
    try {
        const oldModel = await Product.fetchSingle(id);
        const product = oldModel[0];
        if (!oldModel) {
            return ApiResponseModel(res, ERROR, "Product not found");
        }
        const user = await User.getUser(userId);
        const logPayload = {
            user: user.username,
            action: EDITPRODUCT,
            branchLocation: user.branchLocation,
            log: `${user.username} modified a product called ${product.productName}`
        }   
        await SystemLogs.addLog(logPayload);
        const updatedProduct = await Product.updateProduct(id, data);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, updatedProduct, oldModel);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}