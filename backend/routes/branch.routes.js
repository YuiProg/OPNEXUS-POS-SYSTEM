import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import { addBranches, getBranch } from '../controller/branch.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    addBranch,
    getBranches
} = ApiConfig;

const router = express.Router();

router.post(addBranch, protectRoutes, addBranches);

router.get(getBranches, protectRoutes, getBranch);

export default router;