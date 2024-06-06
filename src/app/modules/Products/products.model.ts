import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './products.interface';
//variant schema-sub schema
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
//Inventory schema -sub schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});
//creating products schema
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      'Electronics',
      'Fitness',
      'Footwear',
      'Kitchen',
      'Wearable',
      'Audio',
    ],
    required: true,
  },
  tags: { type: [String], required: true },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});
//creating model on products schema
export const ProductModel = model<TProduct>('Product', productSchema);
