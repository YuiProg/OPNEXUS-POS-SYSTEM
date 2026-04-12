import Sales from "../models/Sales.js";
import Strings from "../strings/strings-codes.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js";

const {
    ERROR,
    ORDER_PROC,
    CREATED,
    GETSALES
} = Strings;

export const createSale = async (req, res) => {
    try {
        const data = req.body;
        const {items} = data;
        const updatedStock = await Product.updateMany(items);
        const newSale = await Sales.createSale(data);
        ApiResponseModel(res, CREATED, ORDER_PROC, {updatedStock, newSale});
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getSales = async (req, res) => {
    try {
        const {branch} = req.params;
        console.log(branch);
        const sales = await Sales.getSales(branch);
        ApiResponseModel(res, CREATED, GETSALES, sales);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const fetchSingleSale = async (req, res) => {
    try {
        const {id} = req.params;
        const record = await Sales.getSingle(id);
        ApiResponseModel(res, CREATED, GETSALES, record);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}