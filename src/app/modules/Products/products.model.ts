import { Schema, model } from 'mongoose';
import {
  TInventory,
  TProduct,
  TVariant,
  TVariantType,
} from './products.interface';
//variant schema-sub schema
const variantSchema = new Schema<TVariant>({
  type: { type: String, enum: Object.values(TVariantType), required: true },
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
  id: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Electronics', 'Fitness', 'Footwear', 'Kitchen', 'Wearable'],
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
const ProductModel = model<TProduct>('ProductModel', productSchema);
