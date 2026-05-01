import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { createCategory, deleteCategory, getCategories } from '../controller/category.controller.js';

const {
    CREATECATEGORY,
    GETCATEGORIES,
    DELETECATEGORY
} = ApiConfig;

const router = express.Router();

router.post(CREATECATEGORY, protectRoutes, createCategory);
router.post(DELETECATEGORY, protectRoutes, deleteCategory);

router.get(GETCATEGORIES, protectRoutes, getCategories);

export default router;