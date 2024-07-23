import dotenv from "dotenv";
dotenv.config();
import express from 'express';
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

export default app;