import { Request, Response } from 'express';
import logger from '../uitilities/logger';
import { verfyJWT } from '../uitilities/auth';
import { AuthServices } from '../services/auths';
import { message, statusCode } from '../uitilities/constants';
import { successAction, failAction } from '../uitilities/response';

class authController {
  public static async checkAuthToken(req: Request, res: Response) {
    try {
      const token: any = req.headers.authorization || req.query.authorization || undefined;

      if (token) {
        const verfyJWTData = await verfyJWT(token);
        if (verfyJWTData.isError) {
          if (verfyJWTData.message === 'token_expired') {
            res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
          } else {
            res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, verfyJWTData.message, message.tokenExpired));
          }
        } else {
          const authUserData = await AuthServices.findAuthUser(verfyJWTData?.decoded?.userId, token);

          if (authUserData) {
            res.status(statusCode.success).json(successAction(statusCode.success, authUserData, message.fetch('User')));
          } else {
            res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
          }
        }
      }
    } catch (err: any) {
      logger.error(message.errorLog('checkAuthToken', 'authController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }
}

export default authController;
