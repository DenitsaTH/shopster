import exppress from 'express';
import { 
    registerUserCtrl, 
    loginUserCtrl, 
    getUserProfileCtrl } from '../controllers/usersCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const userRouter = exppress.Router();

userRouter.post('/register', registerUserCtrl);
userRouter.post('/login', loginUserCtrl);
userRouter.get('/profile', isLoggedIn, getUserProfileCtrl);

export default userRouter;