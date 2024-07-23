import exppress from 'express';
import { registerUserCtrl, loginUserCtrl } from '../controllers/usersCtrl.js';

const userRoutes = exppress.Router();

userRoutes.post('/api/v1/users/register', registerUserCtrl);
userRoutes.post('/api/v1/users/login', loginUserCtrl);

export default userRoutes;