import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { globalErrorHandler, notFound } from "../middleware/globalErrorHandler.js";
import userRouter from "../routes/usersRoute.js";
import dbConnnect from '../config/dbConnect.js';
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRoute.js";
import brandsRouter from "../routes/brandsRoute.js";

// db connection
dbConnnect();

// create the app - an instance of express
const app = express(); 

// pass incoming data
app.use(express.json());

// routes
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);

// error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;