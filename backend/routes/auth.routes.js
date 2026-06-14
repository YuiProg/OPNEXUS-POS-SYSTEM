import express from 'express';
import { getAuthUser, loginUser, register, logoutUser, updateUser, getUsers, deleteMultiple, deleteSingle, getSingleUser, changePassword, validateNewUser } from '../controller/auth.Controller.js';
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
    deleteMultipleUsers,
    deleteSingleUser,
    GET_SINGLE_USER,
    UPDATE_USER,
    CHANGEPASSWORD,
    VALIDATEUSER
} = ApiConfig;

router.post(registerUsers, register);
router.post(loginUsers, loginUser);
router.post(logoutUsers, logoutUser);
router.post(addUser, protectRoutes, register);
router.post(UPDATE_USER, protectRoutes, updateUser);
router.post(CHANGEPASSWORD, protectRoutes, changePassword);
router.post(VALIDATEUSER, validateNewUser);

router.put(updateUsers, updateUser);

router.get(getUser, protectRoutes, getAuthUser);
router.get(GET_SINGLE_USER, protectRoutes, getSingleUser);
router.get(fetchUsers, protectRoutes, getUsers);

router.post(deleteMultipleUsers, protectRoutes, deleteMultiple);
router.post(deleteSingleUser, protectRoutes, deleteSingle);

export default router;