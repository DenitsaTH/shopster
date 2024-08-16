import exppress from 'express';
import { createReviewCtrl } from '../controllers/reviewsCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const reviewRouter = exppress.Router();

reviewRouter.post('/:productId', isLoggedIn, createReviewCtrl);

export default reviewRouter;