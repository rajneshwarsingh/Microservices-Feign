import logger from '../uitilities/logger';
import { db } from '../models';

export class AuthServices {
  public static async findAuthUser(userId: string, token: string) {
    try {
      const authentication = await db.authentications.findOne({
        where: {
          userId: userId,
          authToken: token,
        },
      });

      return authentication ? await db.users.findOne({ where: { id: authentication.userId }, attributes: ['id', 'name', 'age', 'email'] }) : null;
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}
