import express from 'express';
import * as pageConttroller from '../controllers/pageConttroller.js'


const router = express.Router();

router.route('/').get(pageConttroller.getIndex)
router.route('/hakkinda').get(pageConttroller.getHakkinda)
router.route('/hizmetlerimiz').get(pageConttroller.getHizmetlerimiz)
router.route('/yaptigimiz_isler').get(pageConttroller.getBlog)
router.route('/iletisim').get(pageConttroller.getContact)

export default router

