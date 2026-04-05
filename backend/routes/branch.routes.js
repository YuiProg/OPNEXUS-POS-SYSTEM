import express from 'express';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import {addBranches, getBranch, getBranchByLocation, removeUserFromBranch, setActiveBranch, setOfflineBranch, updateBranch} from '../controller/branch.controller.js';

const {
    ADDBRANCH,
    GETBRANCHES,
    SETBRANCHACTIVE,
    SETBRANCHOFFLINE,
    UPDATEBRANCH,
    GETBRANCHBYLOCATION,
    REMOVEUSERFROMBRANCH
} = ApiConfig;

const router = express.Router();

router.post(ADDBRANCH, protectRoutes, addBranches);
router.post(SETBRANCHACTIVE, protectRoutes, setActiveBranch);
router.post(SETBRANCHOFFLINE, protectRoutes, setOfflineBranch);
router.post(UPDATEBRANCH, protectRoutes, updateBranch);
router.post(REMOVEUSERFROMBRANCH, protectRoutes, removeUserFromBranch);

router.get(GETBRANCHBYLOCATION, protectRoutes, getBranchByLocation);
router.get(GETBRANCHES, protectRoutes, getBranch);

export default router;