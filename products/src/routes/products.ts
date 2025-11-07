import express from 'express';
import productCtrl from '../controllers/products';
import validationMiddleware from '../validators/joi.validator';
import checkAuthToken from '../uitilities/auth';
const router = express.Router();

/* Product CRUD */
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), checkAuthToken, productCtrl.productList);
router.post('/', (req, res, next) => validationMiddleware(req, res, next, 'product'), checkAuthToken, productCtrl.productAdd);
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'product'), checkAuthToken, productCtrl.productUpdate);
router.delete('/:id', checkAuthToken, productCtrl.productDelete);
router.get('/userProductList', (req, res, next) => validationMiddleware(req, res, next, 'listing'), productCtrl.userProductList);

export default router;
