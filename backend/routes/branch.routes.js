import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import {addBranches, getBranch} from '../controller/branch.Controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    ADDBRANCH,
    GETBRANCHES
} = ApiConfig;

const router = express.Router();

router.post(ADDBRANCH, protectRoutes, addBranches);

router.get(GETBRANCHES, protectRoutes, getBranch);

export default router;