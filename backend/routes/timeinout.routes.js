import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { clockOut, getTimeData } from '../controller/timein.Controller.js';

const router = express.Router();

const {
    TIMEIN,
    TIMEOUT,
    GETDATATIME
} = ApiConfig;

//timein
router.post(TIMEOUT, protectRoutes, clockOut);

router.get(GETDATATIME, protectRoutes, getTimeData);

export default router;