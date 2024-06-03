import { Schema } from 'mongoose';

export enum TVariantType {
  Color = 'color',
  Size = 'size',
  Capacity = 'capacity',
  Switch = 'switch',
  Strap = 'strap',
}
export type TVariant = {
  type: TVariantType;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};
export type TProduct = {
  id?: string;
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
