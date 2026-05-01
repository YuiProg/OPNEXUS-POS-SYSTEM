import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { calculateNetProfit, getMonthlySale, getTopProducts, todayRevenue, todaysSale } from '../controller/dashboard.controller.js';

const {
    GETMONTHLYSALES,
    GETTODAYSALES,
    GETNETPROFIT,
    GETTOPPRODUCTS,
    GETTODAYSREVENUE
} = ApiConfig;

const router = express.Router();

router.get(GETTODAYSALES, protectRoutes, todaysSale);
router.get(GETMONTHLYSALES, protectRoutes, getMonthlySale);
router.get(GETNETPROFIT, protectRoutes, calculateNetProfit);
router.get(GETTOPPRODUCTS, protectRoutes, getTopProducts);
router.get(GETTODAYSREVENUE, protectRoutes, todayRevenue);

export default router;