import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { createSale } from '../controller/sales.Controller.js';

const {
    NEWSALE
} = ApiConfig;

const router = express.Router();

router.post(NEWSALE, protectRoutes, createSale);

export default router;