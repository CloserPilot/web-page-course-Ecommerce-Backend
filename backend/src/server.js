import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import productRouter from './routes/products.routes.js';
import deliveryRouter from './routes/deliveryOptions.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use('/products', productRouter);
app.use('/delivery',deliveryRouter);

// get the images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//http://localhost:4000/products
//http://localhost:4000/delivery


export default app;