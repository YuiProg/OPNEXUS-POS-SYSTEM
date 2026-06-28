import express from 'express'
import ApiConfig from '../../client/src/Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { addSupplier, getSupplier } from '../controller/supplier.Controller.js';

const {
    ADDSUPPLIER,
    GETSUPPLIERS
} = ApiConfig;

const router = express.Router();

router.post(ADDSUPPLIER, protectRoutes, addSupplier);

router.get(GETSUPPLIERS, protectRoutes, getSupplier);

export default router;