import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  productRouter,
  deliveryRouter,
  cartRouter,
  orderRouter,
  globalRouter,
  paymentsSummaryRouter
} from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/delivery',deliveryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/reset',globalRouter);
app.use('/api/payment-summary', paymentsSummaryRouter);

// get the images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

export default app;