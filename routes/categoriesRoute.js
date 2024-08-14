import exppress from 'express';
import {
    createCategoryCtrl,
    getCategoriesCtrl,
    getCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
} from '../controllers/categoriesCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const categoriesRouter = exppress.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryCtrl);
categoriesRouter.get('/', getCategoriesCtrl);
categoriesRouter.get('/:id', getCategoryCtrl);
categoriesRouter.put('/:id', isLoggedIn, updateCategoryCtrl);
categoriesRouter.delete('/:id', isLoggedIn, deleteCategoryCtrl);


export default categoriesRouter;