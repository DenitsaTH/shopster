import exppress from 'express';
import { createProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js'

const productsRouter = exppress.Router();

productsRouter.post('/', isLoggedIn, createProductCtrl);

export default productsRouter;