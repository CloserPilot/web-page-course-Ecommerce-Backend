import express from 'express';
import dotenv from 'dotenv';

dotenv.config(
    { path: './.env' }
);

const server = express();
server.use(express.json());

import userRouter from './routes/user.routes.js';
server.use('/api/v1/users', userRouter);


//example route http://localhost:4000/api/v1/users/register
export default server;