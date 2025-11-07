/*
 * @file: response.ts
 * @description: It contain function layer for api response status with data.
 * @author: Rajneshwar Singh
 */

export const successAction = (statusCode: number, data: {}, message = 'Success') => {
  return { statusCode, data, message };
};

export const failAction = (statusCode: number, errorMessage: string, message = 'Fail') => {
  return { statusCode, errorMessage, message };
};
