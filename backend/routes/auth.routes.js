import express from 'express';
import { getAuthUser, loginUser, register, logoutUser } from '../controller/auth.Controller.js';
import ApiConfig from '../ApiConfig/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();
const { 
    getUser, 
    loginUsers,
    registerUsers,
    logoutUsers
} = ApiConfig;

router.post(registerUsers, register);
router.post(loginUsers, loginUser);
router.post(logoutUsers, logoutUser);

router.get(getUser, protectRoutes, getAuthUser);

export default router;