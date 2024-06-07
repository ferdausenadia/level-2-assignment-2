import { Request, Response } from 'express';
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = orderValidationSchema.validate(
      req.body,
    );
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const order = await OrderServices.createOrderService(validatedData);
    const responseData = {
      email: order.email,
      productId: order.productId,
      price: order.price,
      quantity: order.quantity,
    };
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: responseData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};
//**********************Create Order End Here*************
//**************Get ALL Orders  and get order by email */

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    let orders;
    if (email) {
      orders = await OrderServices.getOrdersByEmailFromDB(email as string);
    } else {
      orders = await OrderServices.getAllOrdersFromDB();
    }

    const filteredOrders = orders.map((order) => ({
      email: order.email,
      productId: order.productId,
      price: order.price,
      quantity: order.quantity,
    }));

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: filteredOrders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};
/*********End here */

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
