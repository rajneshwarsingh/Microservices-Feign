/*
 * @file: common.js
 * @description: It contain auth functions.
 * @author: Rajneshwar Singh
 */
import { message, statusCode } from './constants';
import { failAction } from './response';
import client from './helpers';

async function checkAuthToken(req: any, res: any, next: any) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const data = await client.verifyToken({ authorization: token });

      if (data.data) {
        req.user = data.data;
        next();
      } else {
        res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
      }
    } else {
      res.status(statusCode.authTokenRequired).json(failAction(statusCode.authTokenRequired, message.tokenRequried, message.tokenRequried));
    }
  } catch (err) {
    res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
  }
}

export default checkAuthToken;
