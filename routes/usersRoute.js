import exppress from 'express';
import { registerUserCtrl } from '../controllers/usersCtrl.js';

const userRoutes = exppress.Router();

userRoutes.post('/api/v1/users/register', registerUserCtrl);

export default userRoutes;