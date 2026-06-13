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

const logResponse = (req, status, data) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${status}`, JSON.stringify(data))
}

export const createSale = async (req, res) => {
    try {
        const data = req.body;
        const { items } = data;
        const _id = data.purchasedBy?._id ?? null;
        const isActive = data.purchasedBy?.status;
        const earnedPoints = Math.floor((data.amountPaid || 0) / 100);

        if (isActive === 'INACTIVE') {
            logResponse(req, ERROR, { status: 'Card is current expired or inactive.' });
            return ApiResponseModel(res, ERROR, 'Card is current expired or inactive.');
        }

        if (_id != null && isActive === 'ACTIVE') {
            if (data.usedDiscount === 'Yes') {
                await Vip.removePoints(_id, data.pointsUsed);
            }
            if (earnedPoints > 0) {
                await Vip.addVipPoints(_id, earnedPoints);
            }
        }

        const updatedStock = await Product.updateMany(items);
        const newSale = await Sales.createSale(data);
        logResponse(req, CREATED, { status: ORDER_PROC, data: { updatedStock, newSale } });
        ApiResponseModel(res, CREATED, ORDER_PROC, { updatedStock, newSale });
    } catch (error) {
        logResponse(req, ERROR, { status: error.message });
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getSales = async (req, res) => {
    try {
        const {branch} = req.params;
        console.log(branch);
        const sales = await Sales.getSales(branch);
        logResponse(req, CREATED, { status: GETSALES, data: sales });
        ApiResponseModel(res, CREATED, GETSALES, sales);
    } catch (error) {
        logResponse(req, ERROR, { status: error.message });
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const fetchSingleSale = async (req, res) => {
    try {
        const {id} = req.params;
        const record = await Sales.getSingle(id);
        logResponse(req, CREATED, { status: 'Single sale record fetched', data: record });
        ApiResponseModel(res, CREATED, 'Single sale record fetched', record);
    } catch (error) {
        logResponse(req, ERROR, { status: error.message });
        ApiResponseModel(res, ERROR, error.message);
    }
}