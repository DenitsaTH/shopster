import exppress from 'express';
import {
    createBrandCtrl,
    getBrandsCtrl,
    getBrandCtrl,
    updateBrandCtrl,
    deleteBrandCtrl,
} from '../controllers/brandsCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const brandsRouter = exppress.Router();

brandsRouter.post('/', isLoggedIn, createBrandCtrl);
brandsRouter.get('/', getBrandsCtrl);
brandsRouter.get('/:id', getBrandCtrl);
brandsRouter.put('/:id', isLoggedIn, updateBrandCtrl);
brandsRouter.delete('/:id', isLoggedIn, deleteBrandCtrl);


export default brandsRouter;