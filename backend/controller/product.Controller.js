import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js"
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    SERVER_ERROR,
    CREATED,
    NEW_PRODUCT,
    SUCCESS
} = Strings;

export const newProduct = async (req, res) => {
    const data = req.body;
    const user = req.user;
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
        ApiResponseModel(res, SUCCESS, NEW_PRODUCT, products);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}