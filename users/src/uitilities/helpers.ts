/*
 * @file: helpers.js
 * @description: It contain feign client.
 * @author: Rajneshwar Singh
 */

const feign = require('feignjs');
const FeignRequest = require('feignjs-request');
const key: any = process.env.NODE_ENV;

var apiDescription = {
  userProductList: 'GET /v1/product/userProductList',
};

var client = feign
  .builder()
  .client(new FeignRequest({ debug: true, json: true }))
  .target(apiDescription, 'http://localhost:8080');

export default client;
