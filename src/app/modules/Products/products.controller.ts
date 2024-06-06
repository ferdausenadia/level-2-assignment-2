import { Request, Response } from 'express';
import { ProductServices } from './products.service';

//Product Insertion Controller
export const insertProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.InsertProductIntoDB(product);

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
      message: err.message,
    });
  }
};
//Product Insertion End
export const ProductControllers = {
  insertProduct,
};
