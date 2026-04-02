import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { clockIn, clockOut, getAllTimeData, getTimeData } from '../controller/timein.Controller.js';

const router = express.Router();

const {
    TIMEIN,
    TIMEOUT,
    GETDATATIME,
    GETALLTIMEDATA
} = ApiConfig;

//timein
router.post(TIMEIN, protectRoutes, clockIn);
router.post(TIMEOUT, protectRoutes, clockOut);

router.get(GETDATATIME, protectRoutes, getTimeData);
router.get(GETALLTIMEDATA, protectRoutes, getAllTimeData);

export default router;