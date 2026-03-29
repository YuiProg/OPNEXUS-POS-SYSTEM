import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import { deleteMultipleProducts, deleteProductSingle, fetchProducts, newProduct } from '../controller/product.Controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    addProduct,
    fetchProduct,
    deleteMultipleProduct,
    deleteSingleProduct
} = ApiConfig;

const router = express.Router();

router.post(addProduct, protectRoutes, newProduct);

//delete
router.post(deleteMultipleProduct, protectRoutes, deleteMultipleProducts);
router.post(deleteSingleProduct, protectRoutes, deleteProductSingle);

router.get(fetchProduct, protectRoutes, fetchProducts);

export default router;