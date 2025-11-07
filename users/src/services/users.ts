import logger from '../uitilities/logger';
import { hashPassword, comparePassword } from '../uitilities/common';
import { db } from '../models';
import jwt from 'jsonwebtoken';

/* Environment */
import { config } from '../config/default';
const key: string = process.env.NODE_ENV || 'development';
const jwtSecret = config[key].secret.jwt;

export class UserServices {
  public static async userList(query: any) {
    try {
      return await db.users.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name', 'age', 'email'],
        order: [['createdAt', 'asc']],
        offset: query.page ? (parseInt(query.page) - 1) * parseInt(query.limit) : 0,
        limit: query.limit ? parseInt(query.limit) : 10,
      });
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async userAdd(body: any) {
    try {
      const user = await db.users.findOne({ where: { email: body.email } });

      if (user) {
        return 'userAlreadyExist';
      } else {
        const password = await hashPassword(body.password);
        return await db.users.create({
          name: body.name,
          age: body.age,
          email: body.email,
          password,
        });
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async userUpdate(params: any, body: any) {
    try {
      const users = await db.users.findOne({
        where: {
          id: params.id,
        },
      });
      if (!users) {
        return 'notExist';
      } else {
        return await users.update(body);
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async userDelete(params: any) {
    try {
      const users = await db.users.findOne({
        where: {
          id: params.id,
        },
      });
      if (!users) {
        return 'notExist';
      } else {
        const today = new Date();
        return await users.update({ isDeleted: true, deletedAt: today });
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async login(body: any) {
    try {
      const user = await db.users.findOne({ where: { email: body.email } });

      if (user) {
        if ((await comparePassword(body.password, user.password)) === true) {
          const token = jwt.sign({ userId: user.id }, jwtSecret, {
            expiresIn: 60 * 60,
          });
          user.dataValues['token'] = token;
          delete user.dataValues.password;
          db.authentications.create({
            // Save authentications
            userId: user.id,
            authToken: token,
            expiresIn: 60 * 60,
          });

          return user;
        } else {
          return 'invalidUser';
        }
      } else {
        return 'notExist';
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}
