/*
 * @file: common.js
 * @description: It contain auth functions.
 * @author: Rajneshwar Singh
 */

import jwt from 'jsonwebtoken';
import { db } from '../models';
import { message, statusCode } from '../uitilities/constants';
import { failAction } from '../uitilities/response';

/* Environment */
import { config } from '../config/default';
const key: string = process.env.NODE_ENV || 'development';
const jwtSecret = config[key].secret.jwt;

async function checkAuthToken(req: any, res: any, next: any) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const verfyJWTData = await verfyJWT(token);
    if (verfyJWTData.isError) {
      if (verfyJWTData.message === 'token_expired') {
        res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
      } else {
        res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, verfyJWTData.message, message.tokenExpired));
      }
    } else {
      const authentication = await db.authentications.findOne({
        where: {
          userId: verfyJWTData?.decoded?.userId,
          authToken: token,
        },
      });
      if (authentication) {
        req.user = await db.users.findOne({ where: { id: authentication.userId }, attributes: ['id', 'name', 'age', 'email'] });
        next();
      } else {
        res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
      }
    }
  } else {
    res.status(statusCode.authTokenRequired).json(failAction(statusCode.authTokenRequired, message.tokenRequried, message.tokenRequried));
  }
}

async function verfyJWT(token: string) {
  const data = {
    message: '',
    isError: false,
    decoded: {
      userId: '',
    },
  };
  await jwt.verify(token, jwtSecret, async function (err: any, decoded: any) {
    if (err) {
      data.isError = true;
      if (err.message === 'jwt expired') {
        data.message = 'token_expired';
      } else {
        data.message = err.message;
      }
    } else {
      data.message = 'verifyed';
      data.decoded = decoded;
    }
  });
  return data;
}

export { checkAuthToken, verfyJWT };
