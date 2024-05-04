import express from 'express';
import * as adminController from '../controllers/adminControllers.js';


const router = express.Router();

router.route('/').get(adminController.getAdminLogin);
router.route('/').post(adminController.postAdminLogin);

export default router;
