import express from 'express';
import { ProductControllers } from './products.controller';
const router = express.Router();

//will call controller function

router.post('/products', ProductControllers.insertProduct);
router.get('/products', ProductControllers.getAllProducts);
router.get('/products/:productId', ProductControllers.getProductById);
router.put('/products/:productId', ProductControllers.updateProduct);
router.delete('/products/:productId', ProductControllers.deleteProductById);

export const ProductRoutes = router;
