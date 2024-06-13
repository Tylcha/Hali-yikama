import express from 'express';
import * as adminController from '../controllers/adminControllers.js';

const router = express.Router();

// /adminLogin
router.route('/').get(adminController.getAdminLogin)
router.route('/').post(adminController.postAdminLogin);
router.route('/logout').get(adminController.getLogout);// /adminLogin/logout

//admincreate /adminlogin/createAdmin
router.route('/createAdmin').post(adminController.postCreateAdmin)

//photos /adminLogin/photoUpload
router.route('/photoUploadPage').get(adminController.getPhotoUpload)
router.route('/photoUploadPage').post(adminController.postPhotoUpload);

// /adminLogin/deletePhotos
router.route('/deletePhotos/:id').delete(adminController.postDetelePhotos);

export default router;
