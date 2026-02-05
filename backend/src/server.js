import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  productRouter,
  deliveryRouter,
  cartRouter,
  orderRouter,
  globalRouter
} from './routes/index.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use('/products', productRouter);
app.use('/delivery',deliveryRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/reset',globalRouter);

// get the images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

export default app;