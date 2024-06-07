import Joi from 'joi';

const orderValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  productId: Joi.string().required().messages({
    'any.required': 'Product ID is required',
  }),
  price: Joi.number().positive().required().messages({
    'any.required': 'Price is required',
    'number.positive': 'Price must be a positive number',
  }),
  quantity: Joi.number().integer().positive().required().messages({
    'any.required': 'Quantity is required',
    'number.integer': 'Quantity must be an integer',
    'number.positive': 'Quantity must be a positive number',
  }),
});
export { orderValidationSchema };
