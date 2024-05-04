import express from 'express';
import * as adminController from '../controllers/adminControllers.js';

const router = express.Router();

router
    .route('/')
    .get(adminController.getAdminLogin)
    .post(adminController.postAdminLogin);

router
    .route('/photoUpload')
    .get(adminController.getPhotoUpload)
    .post(adminController.postPhotoUpload);

export default router;
