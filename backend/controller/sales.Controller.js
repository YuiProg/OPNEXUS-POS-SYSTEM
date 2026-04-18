import Sales from "../models/Sales.js";
import Strings from "../strings/strings-codes.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Product from "../models/Products.js";
import Vip from "../models/VipModel.js";

const {
    ERROR,
    ORDER_PROC,
    CREATED,
    GETSALES
} = Strings;

export const createSale = async (req, res) => {
    try {
        const data = req.body;
        const { items } = data;
        const _id = data.purchasedBy?._id ?? null;
        const isActive = data.purchasedBy?.status;
        const baseAmount = data.total || data.discountAmount || data.amountPaid;
        const earnedPoints = Math.floor(baseAmount / 100);

        if (isActive === 'INACTIVE') {
            return ApiResponseModel(res, ERROR, 'Card is current expired or inactive.');
        }

        if (_id != null && isActive === 'ACTIVE') {
            if (data.usedDiscount === 'Yes') {
                await Vip.removePoints(_id);
            }
            if (earnedPoints > 0) {
                await Vip.addVipPoints(_id, earnedPoints);
            }
        }

        const updatedStock = await Product.updateMany(items);
        const newSale = await Sales.createSale(data);
        ApiResponseModel(res, CREATED, ORDER_PROC, { updatedStock, newSale });
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
        ApiResponseModel(res, CREATED, 'Single sale record fetched', record);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}