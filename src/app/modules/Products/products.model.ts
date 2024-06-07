import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './products.interface';

// Variant schema - sub-schema
const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
    trim: true,
  },
});

// Inventory schema - sub-schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock status is required'],
  },
});

// Creating products schema
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Product price is required'] },
  category: {
    type: String,
    enum: {
      values: [
        'Electronics',
        'Fitness',
        'Footwear',
        'Kitchen',
        'Wearable',
        'Audio',
      ],
      message: '{VALUE} is not a valid category',
    },
    required: [true, 'Product category is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
    trim: true,
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants are required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory is required'],
  },
});

// Creating model on products schema
export const ProductModel = model<TProduct>('Product', productSchema);
