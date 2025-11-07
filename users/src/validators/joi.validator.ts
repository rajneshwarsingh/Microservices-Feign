/*
 * @file: validators/joi.validator.js
 * @description: It contain validation function on request body, params and query.
 * @author: Rajneshwar Singh
 */

import joi from 'joi';

// Object schema validation
const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const product = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.string().required(),
});

const user = joi.object({
  name: joi.string().optional(),
  age: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().optional(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validationMiddleware = async (req: any, res: any, next: any, schema: string) => {
  console.log('req', req.body);
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema == 'listing') {
    var { error } = listing.validate(req.query, option);
  }

  if (schema == 'product') {
    var { error } = product.validate(req.body, option);
  }

  if (schema == 'user') {
    var { error } = user.validate(req.body, option);
  }

  if (schema == 'login') {
    var { error } = login.validate(req.body, option);
  }

  if (error) {
    res.status(400).json({ validationError: error.details[0].message });
  } else {
    next();
  }
};

export default validationMiddleware;
