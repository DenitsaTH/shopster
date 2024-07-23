import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import dbConnnect from '../config/dbConnect.js';

dbConnnect(); // db connection
const app = express(); // create the app - an instance of express

export default app;