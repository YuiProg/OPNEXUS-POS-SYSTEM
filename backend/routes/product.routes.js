import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import { newProduct } from '../controller/product.Controller.js';

const {
    addProduct
} = ApiConfig;

const router = express.Router();

router.post(addProduct, newProduct);

export default router;