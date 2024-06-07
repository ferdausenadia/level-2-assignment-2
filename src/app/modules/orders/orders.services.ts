import { ProductModel } from '../Products/products.model';
import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrderService = async (orderData: TOrder) => {
  const product = await ProductModel.findById(orderData.productId);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  const order = new OrderModel(orderData);
  return await order.save();
};
const getAllOrdersFromDB = async () => {
  return await OrderModel.find();
};

const getOrdersByEmailFromDB = async (email: string) => {
  return await OrderModel.find({ email });
};
export const OrderServices = {
  createOrderService,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
