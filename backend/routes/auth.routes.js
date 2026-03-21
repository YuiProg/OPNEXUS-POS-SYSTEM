import express from 'express';
import { getAuthUser, loginUser, register, logoutUser, updateUser } from '../controller/auth.Controller.js';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();
const { 
    getUser, 
    loginUsers,
    registerUsers,
    logoutUsers,
    updateUsers
} = ApiConfig;

router.post(registerUsers, register);
router.post(loginUsers, loginUser);
router.post(logoutUsers, logoutUser);

router.put(updateUsers, updateUser);

router.get(getUser, protectRoutes, getAuthUser);

export default router;