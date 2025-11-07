import express from 'express';
import userCtrl from '../controllers/users';
import validationMiddleware from '../validators/joi.validator';
import { checkAuthToken } from '../uitilities/auth';
const router = express.Router();

/* User CRUD */
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), checkAuthToken, userCtrl.userList);
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'user'), checkAuthToken, userCtrl.userUpdate);
router.delete('/:id', checkAuthToken, userCtrl.userDelete);

/* User Login & SignUp */
router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'), userCtrl.login);
router.post('/signUp', (req, res, next) => validationMiddleware(req, res, next, 'user'), userCtrl.userAdd);

/* User Product */
router.get('/productList', (req, res, next) => validationMiddleware(req, res, next, 'user'), checkAuthToken, userCtrl.productList);

export default router;
