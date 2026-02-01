import express from 'express';

const app = express();
app.use(express.json());

import itemRouter from './routes/item.routes.js';
import productRouter from './routes/products.routes.js';
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/products', productRouter);


//example route http://localhost:4000/api/v1/item/register
export default app;