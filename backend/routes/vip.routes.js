import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { addVip, getVipById } from '../controller/vip.Controller.js';

const {
    ADDVIP,
    USEVIPCARD
} = ApiConfig;

const router = express.Router();

router.post(ADDVIP, protectRoutes, addVip);

router.get(USEVIPCARD, protectRoutes, getVipById);

export default router;