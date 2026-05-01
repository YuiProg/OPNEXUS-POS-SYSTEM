import express from 'express'
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { getLogs } from '../controller/logs.Controller.js';

const {
    GETLOGS
} = ApiConfig;

const router = express.Router();

router.get(GETLOGS, protectRoutes, getLogs);

export default router;