import Category from "../models/CategoryModel.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    CREATED,
    CATEGORYCREATED,
    DELETECATEGORY,
    GETCATEGORIES
} = Strings

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const {userId} = req.user;
        const newCateg = await Category.addCategory({...data, createdById: userId});
        ApiResponseModel(res, CREATED, CATEGORYCREATED, newCateg);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.getCategories();
        const categoryCleaned = categories.map((data) => ({
            Id: data._id,
            ...data._doc
        }));
        ApiResponseModel(res, CREATED, GETCATEGORIES, categoryCleaned);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Category.deleteCategory(id);
        ApiResponseModel(res, CREATED, DELETECATEGORY, deleted);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}