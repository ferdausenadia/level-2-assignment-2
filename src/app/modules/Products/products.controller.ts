import { Request, RequestHandler, Response } from 'express';
import { ProductServices } from './products.service';
import { error } from 'console';
import { productValidationSchema } from './products.validation';

//************Product Insertion Controller************
const insertProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    //data validation process
    const { error, value: validatedProductData } =
      productValidationSchema.validate(product); //validation done

    if (error) {
      //if the data is not valid
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }
    //if the data is valid
    const result =
      await ProductServices.InsertProductIntoDB(validatedProductData); //if data is valid then we are sending data to the db

    //user response after insertion
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    //error handling
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
//****************Product Insertion End****************

//***************Get All Products Start***************
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.GetAllProductsFromDB();
    //user response after finding data
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
//**********get all producst end***************

//**********Get Products by Id start***********
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.GetProductByIDFromDB(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

//product info updating
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    //validate the req body using joi
    const { error, value: validatedProductData } =
      productValidationSchema.validate(productData); //validation done

    if (error) {
      //if the data is not valid
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }
    //if the data is valid
    const result = await ProductServices.UpdateProductIntoDB(
      productId,
      validatedProductData,
    ); //if data is valid then we are sending data to the db

    //user response after insertion
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    //error handling
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
//**************Delete Product Data */
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.DeleteProductByIdFromDB(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};
//search product
const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductServices.searchProductsFromDb(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while searching for products.',
      error: error.message,
    });
  }
};

export const ProductControllers = {
  insertProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  searchProducts,
};
