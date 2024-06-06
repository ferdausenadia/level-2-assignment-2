import express from 'express';
import { ProductControllers } from './products.controller';
const router = express.Router();

//will call controller function

router.post('/products', ProductControllers.insertProduct);

/*
router.get('/products', getProducts);
router.get('/products/:productId', getProductById);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);
router.get('/products/search', searchProducts);
*/
export const ProductRoutes = router;
