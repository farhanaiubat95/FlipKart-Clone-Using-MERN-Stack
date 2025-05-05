import express from 'express';
import { Getuser , DeleteUser, ToggleUserActivity, GetUserById,UpdateUser, CreateCategory,GetAllCategories} from '../controller/Admincontroller.js';
import { isAdmin } from '../middleware/VerifyToken.js';

const Adminrouter = express.Router();

Adminrouter.get('/dashboard/getuser', isAdmin , Getuser)
Adminrouter.get('/dashboard/getuserbyid/:id', isAdmin, GetUserById);
Adminrouter.post('/dashboard/updateuser/:id', isAdmin, UpdateUser);
Adminrouter.post('/dashboard/delete/:id', isAdmin , DeleteUser)
Adminrouter.post('/dashboard/toggle-activity/:id', isAdmin, ToggleUserActivity)

Adminrouter.post('/dashboard/create-category', isAdmin, CreateCategory)
Adminrouter.get('/dashboard/getcategories', isAdmin, GetAllCategories)

export default Adminrouter;