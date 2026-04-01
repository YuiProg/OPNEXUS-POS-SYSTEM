import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import {addBranches, getBranch, setActiveBranch, setOfflineBranch} from '../controller/branch.Controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const {
    ADDBRANCH,
    GETBRANCHES,
    SETBRANCHACTIVE,
    SETBRANCHOFFLINE
} = ApiConfig;

const router = express.Router();

router.post(ADDBRANCH, protectRoutes, addBranches);
router.post(SETBRANCHACTIVE, protectRoutes, setActiveBranch);
router.post(SETBRANCHOFFLINE, protectRoutes, setOfflineBranch);

router.get(GETBRANCHES, protectRoutes, getBranch);

export default router;