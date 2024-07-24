import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { globalErrorHandler, notFound } from "../middleware/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import dbConnnect from '../config/dbConnect.js';

// db connection
dbConnnect();

// create the app - an instance of express
const app = express(); 

// pass incoming data
app.use(express.json());

// routes
app.use('/', userRoutes);

// error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;