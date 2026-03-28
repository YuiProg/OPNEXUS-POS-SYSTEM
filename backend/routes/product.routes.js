import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import { deleteMultipleProducts, fetchProducts, newProduct } from '../controller/product.Controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    addProduct,
    fetchProduct,
    deleteMultipleProduct
} = ApiConfig;

const router = express.Router();

router.post(addProduct, protectRoutes, newProduct);
router.post(deleteMultipleProduct, protectRoutes, deleteMultipleProducts);

router.get(fetchProduct, protectRoutes, fetchProducts);

export default router;