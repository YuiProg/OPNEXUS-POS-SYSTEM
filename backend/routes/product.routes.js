import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import { deleteMultipleProducts, deleteProductSingle, fetchOneProduct, fetchProducts, newProduct, updateProduct } from '../controller/product.Controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    addProduct,
    fetchProduct,
    deleteMultipleProduct,
    deleteSingleProduct,
    fetchSingleProduct,
    UPDATEPRODUCT
} = ApiConfig;

const router = express.Router();

router.post(addProduct, protectRoutes, newProduct);

//delete
router.post(deleteMultipleProduct, protectRoutes, deleteMultipleProducts);
router.post(deleteSingleProduct, protectRoutes, deleteProductSingle);

//update
router.post(UPDATEPRODUCT, protectRoutes, updateProduct);

router.get(fetchSingleProduct, protectRoutes, fetchOneProduct);
router.get(fetchProduct, protectRoutes, fetchProducts);

export default router;