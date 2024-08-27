import exppres from 'express';
import {
createOrderCtrl,
} from '../controllers/orderCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const ordersRouter = exppres.Router();

ordersRouter.post('/', isLoggedIn, createOrderCtrl);

export default ordersRouter;