import { Schema } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category:
    | 'Electronics'
    | 'Fitness'
    | 'Footwear'
    | 'Kitchen'
    | 'Wearable'
    | 'Audio';
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};
