import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { ProductRoutes } from './app/modules/Products/products.route';
import { OrderRoutes } from './app/modules/orders/orders.route';

const app: Application = express();
//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/', ProductRoutes);
app.use('/api/', OrderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});
export default app;
