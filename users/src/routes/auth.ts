import express from 'express';
import authCtrl from '../controllers/auth';
const router = express.Router();

router.get('/verifyToken', authCtrl.checkAuthToken);

export default router;
