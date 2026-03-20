import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js"
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    SERVER_ERROR,
    CREATED,
    NEW_PRODUCT
} = Strings;

export const newProduct = async (req, res) => {
    const data = req.body;
    try {
        const newProduct = await Product.addProduct(data);
        ApiResponseModel(res, NEW_PRODUCT, CREATED, newProduct);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}