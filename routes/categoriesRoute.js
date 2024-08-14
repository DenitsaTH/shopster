import exppress from 'express';
import {
    createCategoryCtrl,
} from '../controllers/categoriesCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const categoriesRouter = exppress.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryCtrl);



export default categoriesRouter;