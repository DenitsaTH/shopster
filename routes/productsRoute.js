import exppress from 'express';
import {
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    updateProductCtrl,
    deleteProductCtrl
} from '../controllers/productCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js'

const productsRouter = exppress.Router();

productsRouter.post('/', isLoggedIn, createProductCtrl);
productsRouter.get('/', getProductsCtrl);
productsRouter.get('/:id', getProductCtrl);
productsRouter.put('/:id', isLoggedIn, updateProductCtrl);
productsRouter.delete('/:id/delete', isLoggedIn, deleteProductCtrl);

export default productsRouter;