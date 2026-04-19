import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { addVip, disableManyVip, getAllVip, getVipById, removeVip, updateVip } from '../controller/vip.Controller.js';

const {
    ADDVIP,
    USEVIPCARD,
    GETALLVIP,
    UPDATEVIP,
    DELETEVIP,
    DISABLEMANYVIP
} = ApiConfig;

const router = express.Router();

router.post(ADDVIP, protectRoutes, addVip);
router.post(UPDATEVIP, protectRoutes, updateVip);
router.post(DELETEVIP, protectRoutes, removeVip);
router.post(DISABLEMANYVIP, protectRoutes, disableManyVip);

router.get(GETALLVIP, protectRoutes, getAllVip);
router.get(USEVIPCARD, protectRoutes, getVipById);

export default router;