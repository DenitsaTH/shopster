import exppress from 'express';
import { 
    registerUserCtrl, 
    loginUserCtrl, 
    getUserProfileCtrl } from '../controllers/usersCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const userRoutes = exppress.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);

export default userRoutes;