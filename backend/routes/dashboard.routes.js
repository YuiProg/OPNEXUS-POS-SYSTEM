import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { calculateNetProfit, getMonthlySale, getTopProducts, todaysSale } from '../controller/dashboard.controller.js';

const {
    GETMONTHLYSALES,
    GETTODAYSALES,
    GETNETPROFIT,
    GETTOPPRODUCTS
} = ApiConfig;

const router = express.Router();

router.get(GETTODAYSALES, protectRoutes, todaysSale);
router.get(GETMONTHLYSALES, protectRoutes, getMonthlySale);
router.get(GETNETPROFIT, protectRoutes, calculateNetProfit);
router.get(GETTOPPRODUCTS, protectRoutes, getTopProducts);

export default router;