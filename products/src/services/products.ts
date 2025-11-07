import logger from '../uitilities/logger';
import { db } from '../models';

export class ProductServices {
  public static async productList(query: any) {
    try {
      return await db.products.findAll({
        where: { isDeleted: false },
        attributes: ['id', 'name', 'description', 'price', 'userId'],
        order: [['createdAt', 'asc']],
        offset: query.page ? (parseInt(query.page) - 1) * parseInt(query.limit) : 0,
        limit: query.limit ? parseInt(query.limit) : 10,
      });
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async productAdd(body: any, userId: string) {
    try {
      return await db.products.create({
        name: body.name,
        description: body.description,
        price: body.price,
        userId: userId,
      });
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async productUpdate(params: any, body: any) {
    try {
      const products = await db.products.findOne({
        where: {
          id: params.id,
        },
      });
      if (!products) {
        return 'notExist';
      } else {
        return await products.update(body);
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async productDelete(params: any) {
    try {
      const products = await db.products.findOne({
        where: {
          id: params.id,
        },
      });
      if (!products) {
        return 'notExist';
      } else {
        const today = new Date();
        return await products.update({ isDeleted: true, deletedAt: today });
      }
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  public static async userProductList(query: any) {
    try {
      return await db.products.findAll({
        where: { isDeleted: false, userId: query.userId },
        attributes: ['id', 'name', 'description', 'price', 'userId'],
        order: [['createdAt', 'asc']],
        offset: query.page ? (parseInt(query.page) - 1) * parseInt(query.limit) : 0,
        limit: query.limit ? parseInt(query.limit) : 10,
      });
    } catch (err: any) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}
