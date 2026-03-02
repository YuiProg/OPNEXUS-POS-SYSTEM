import express from 'express';
import { loginUser, register } from '../controller/auth.Controller.js';
import ApiConfig from '../ApiConfig/ApiConfig.js';

const router = express.Router();
const { 
    getUsers, 
    loginUsers,
    registerUsers
} = ApiConfig;

router.post(registerUsers, register);
router.post(loginUsers, loginUser);

export default router;