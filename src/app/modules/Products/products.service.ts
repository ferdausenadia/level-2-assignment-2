import { TProduct } from './products.interface';
import { ProductModel } from './products.model';
import { Types } from 'mongoose';

const InsertProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const GetAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const GetProductByIDFromDB = async (id: string) => {
  // Convert id string to ObjectId
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid product ID');
  }
  const result = await ProductModel.findById(new Types.ObjectId(id));
  return result;
};

const UpdateProductIntoDB = async (
  productId: string,
  updatedData: TProduct,
): Promise<TProduct | null> => {
  return ProductModel.findByIdAndUpdate(productId, updatedData, { new: true })
    .then((updatedProduct) => {
      return updatedProduct;
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      return null;
    });
};

const DeleteProductByIdFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
  } catch (error) {
    throw new Error('Failed to delete product from database');
  }
};
//************Search By Term**************/

const searchProductsFromDb = async (
  searchTerm: string,
): Promise<TProduct[]> => {
  try {
    const regex = new RegExp(searchTerm, 'i');
    const matchingProducts = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }, { tags: regex }],
    });
    return matchingProducts;
  } catch (error: any) {
    throw new Error('Error searching for products: ' + error.message);
  }
};
export const ProductServices = {
  InsertProductIntoDB,
  GetAllProductsFromDB,
  GetProductByIDFromDB,
  UpdateProductIntoDB,
  DeleteProductByIdFromDB,
  searchProductsFromDb,
};
