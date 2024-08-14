import exppress from 'express';
import {
    createColorCtrl,
    getColorsCtrl,
    getColorCtrl,
    updateColorCtrl,
    deleteColorCtrl,
} from '../controllers/colorsCtrl.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const colorsRouter = exppress.Router();

colorsRouter.post('/', isLoggedIn, createColorCtrl);
colorsRouter.get('/', getColorsCtrl);
colorsRouter.get('/:id', getColorCtrl);
colorsRouter.put('/:id', isLoggedIn, updateColorCtrl);
colorsRouter.delete('/:id', isLoggedIn, deleteColorCtrl);


export default colorsRouter;