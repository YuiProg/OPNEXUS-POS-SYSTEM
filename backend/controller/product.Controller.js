import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js"
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    SERVER_ERROR,
    CREATED,
    NEW_PRODUCT,
    SUCCESS,
    SUCCESS_MESS
} = Strings;

export const newProduct = async (req, res) => {
    const data = req.body;
    const user = req.user;
    console.log(data);
    try {
        const newProduct = await Product.addProduct(data, user);
        ApiResponseModel(res, CREATED, NEW_PRODUCT, newProduct);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const fetchProducts = async (req, res) => {
    const {selectedBranch} = req.query;
    try {
        const products = await Product.fetchProducts(selectedBranch);
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
    try {
        const result = await Product.deleteSingle(id);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteMultipleProducts = async (req, res) => {
    try {
        const list = req.body;
        const result = await Product.deleteMultiple(list);
        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}