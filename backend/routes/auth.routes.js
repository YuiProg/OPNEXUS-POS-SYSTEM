import express from 'express';
import { getAuthUser, loginUser, register, logoutUser, updateUser, getUsers, deleteMultiple } from '../controller/auth.Controller.js';
import ApiConfig from '../Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();
const { 
    getUser, 
    loginUsers,
    registerUsers,
    logoutUsers,
    updateUsers,
    addUser,
    fetchUsers,
    deleteMultipleUsers
} = ApiConfig;

router.post(registerUsers, register);
router.post(loginUsers, loginUser);
router.post(logoutUsers, logoutUser);
router.post(addUser, register);

router.put(updateUsers, updateUser);

router.get(getUser, protectRoutes, getAuthUser);
router.get(fetchUsers, protectRoutes, getUsers);

router.post(deleteMultipleUsers, protectRoutes, deleteMultiple);

export default router;