import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { createSale, fetchSingleSale, getSales } from '../controller/sales.Controller.js';

const {
    NEWSALE,
    GETSALES,
    GETSINGLERECORD
} = ApiConfig;

const router = express.Router();

router.post(NEWSALE, protectRoutes, createSale);

router.get(GETSALES, protectRoutes, getSales);
router.get(GETSINGLERECORD, protectRoutes, fetchSingleSale);

export default router;