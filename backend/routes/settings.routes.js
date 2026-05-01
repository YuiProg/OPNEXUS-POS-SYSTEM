import express from 'express';
import ApiConfig from '../../client/src/Api/ApiConfig.js';
import protectRoutes from '../middleware/protectRoutes.js';
import { getSettings, setSettingsToDefault, updateSettings } from '../controller/settings.controller.js';

const {
    GETSETTINGS,
    UPDATESETTINGS,
    RESETSETTINGS
} = ApiConfig;

const router = express.Router();

router.get(GETSETTINGS, protectRoutes, getSettings);

router.post(RESETSETTINGS, protectRoutes, setSettingsToDefault);
router.post(UPDATESETTINGS, protectRoutes, updateSettings);

export default router;