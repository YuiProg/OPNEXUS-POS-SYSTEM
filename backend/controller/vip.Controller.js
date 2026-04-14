import Vip from "../models/VipModel.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    CREATED,
    VIPADD,
    VIPFOUND
} = Strings;

export const addVip = async (req, res) => {
    try {
        const data = req.body;
        const newVip = await Vip.addVip(data);
        ApiResponseModel(res, CREATED, VIPADD, newVip);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getAllVip = async (req, res) => {
    try {
        const vips = await Vip.getAllVip();
        ApiResponseModel(res, CREATED, VIPFOUND, vips);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getVipById = async (req, res) => {
    try {
        const {id} = req.params;
        const vipData = await Vip.getVipById(id);
        ApiResponseModel(res, CREATED, VIPFOUND, vipData);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}