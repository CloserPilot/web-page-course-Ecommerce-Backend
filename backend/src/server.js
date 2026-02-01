import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import itemRouter from './routes/item.routes.js';
import productRouter from './routes/products.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use('/item', itemRouter);
app.use('/products', productRouter);

// get the images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//http://localhost:4000/item/register
//http://localhost:4000/products


export default app;