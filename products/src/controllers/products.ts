import { Request, Response } from 'express';
import logger from '../uitilities/logger';
import { ProductServices } from '../services/products';
import { message, statusCode } from '../uitilities/constants';
import { successAction, failAction } from '../uitilities/response';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

class productController {
  public static async productList(req: Request, res: Response) {
    try {
      const data = await ProductServices.productList(req.query);
      if (data) {
        res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('Product')));
      } else {
        res.status(statusCode.success).json(successAction(statusCode.success, data, message.notExist('Product')));
      }
    } catch (err: any) {
      logger.error(message.errorLog('productList', 'productController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async productAdd(req: Request, res: Response) {
    try {
      const data = await ProductServices.productAdd(req.body, req.user?.id);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.add('Product')));
    } catch (err: any) {
      logger.error(message.errorLog('productAdd', 'productController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async productUpdate(req: Request, res: Response) {
    try {
      const data = await ProductServices.productUpdate(req.params, req.body);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.update('Product')));
    } catch (err: any) {
      logger.error(message.errorLog('productUpdate', 'productController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async productDelete(req: Request, res: Response) {
    try {
      const data = await ProductServices.productDelete(req.params);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.delete('Product')));
    } catch (err: any) {
      logger.error(message.errorLog('productDelete', 'productController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async userProductList(req: Request, res: Response) {
    try {
      const data = await ProductServices.userProductList(req.query);
      if (data) {
        res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('Product')));
      } else {
        res.status(statusCode.success).json(successAction(statusCode.success, data, message.notExist('Product')));
      }
    } catch (err: any) {
      logger.error(message.errorLog('userProductList', 'productController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }
}

export default productController;
