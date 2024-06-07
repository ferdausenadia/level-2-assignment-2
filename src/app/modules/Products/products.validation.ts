import Joi from 'joi';

// Variant schema
const variantSchema = Joi.object({
  type: Joi.string().trim().required().messages({
    'any.required': 'Variant type is required',
  }),
  value: Joi.string().trim().required().messages({
    'any.required': 'Variant value is required',
  }),
});

// Inventory schema
const inventorySchema = Joi.object({
  quantity: Joi.number().integer().positive().required().messages({
    'any.required': 'Inventory quantity is required',
    'number.integer': 'Inventory quantity must be an integer',
    'number.positive': 'Inventory quantity must be a positive number',
  }),
  inStock: Joi.boolean().required().messages({
    'any.required': 'Inventory inStock status is required',
  }),
});

// Product schema
const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Za-z0-9\s]+$/)
    .required()
    .messages({
      'any.required': 'Product name is required',
      'string.pattern.base':
        'Product name must only contain alphanumeric characters',
    }),
  description: Joi.string().trim().regex(/\s+/).required().messages({
    'any.required': 'Product description is required',
  }),
  price: Joi.number().positive().required().messages({
    'any.required': 'Product price is required',
    'number.positive': 'Product price must be a positive number',
  }),
  category: Joi.string()
    .trim()
    .valid('Electronics', 'Fitness', 'Footwear', 'Kitchen', 'Wearable', 'Audio')
    .required()
    .messages({
      'any.required': 'Product category is required',
      'any.only': 'Product category must be one of {{#valids}}',
    }),
  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .regex(/^[A-Za-z0-9\s]+$/),
    )
    .required()
    .messages({
      'any.required': 'Product tags are required',
      'string.pattern.base':
        'Each tag must only contain alphanumeric characters',
    }),
  variants: Joi.array().items(variantSchema).required().messages({
    'any.required': 'Product variants are required',
  }),
  inventory: inventorySchema.required().messages({
    'any.required': 'Product inventory is required',
  }),
});

export { productValidationSchema };
