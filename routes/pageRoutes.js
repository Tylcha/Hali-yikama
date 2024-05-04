import express from 'express';
import * as pageConttroller from '../controllers/pageConttroller.js'


const router = express.Router();

router.route('/').get(pageConttroller.getIndex)
router.route('/about').get(pageConttroller.getAbout)
router.route('/insurance').get(pageConttroller.getInsurance)
router.route('/blog').get(pageConttroller.getBlog)
router.route('/contact').get(pageConttroller.getContact)

export default router

