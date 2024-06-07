import { Request, Response } from 'express';
import { ProductServices } from './products.service';

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
  } catch (err: unknown) {
    //error handling
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};
//****************Product Insertion End****************

//***************Get All Products and get by search term Start***************
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const products = await ProductServices.searchProductsFromDb(
        searchTerm as string,
      );
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    }

    const result = await ProductServices.GetAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err instanceof Error ? err.message : 'Unknown error',
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
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err instanceof Error ? err.message : 'Unknown error',
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
  } catch (err: unknown) {
    //error handling
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err instanceof Error ? err.message : 'Unknown error',
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
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

export const ProductControllers = {
  insertProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
};
