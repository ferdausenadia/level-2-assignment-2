import { TProduct } from './products.interface';
import { ProductModel } from './products.model';

const InsertProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductServices = {
  InsertProductIntoDB,
};
