import exppress from 'express';
import { createProductCtrl, getProductCtrl } from '../controllers/productCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js'

const productsRouter = exppress.Router();

productsRouter.post('/', isLoggedIn, createProductCtrl);
productsRouter.get('/', isLoggedIn, getProductCtrl);

export default productsRouter;