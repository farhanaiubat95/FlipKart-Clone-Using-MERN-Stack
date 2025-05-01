import express from 'express';
import { Getuser , DeleteUser, ToggleUserActivity, GetUserById,UpdateUser, GetUserStats} from '../controller/Admincontroller.js';
import { isAdmin } from '../middleware/VerifyToken.js';

const Adminrouter = express.Router();

Adminrouter.get('/dashboard/getuser', isAdmin , Getuser)
Adminrouter.get('/dashboard/getuserstats', isAdmin , GetUserStats)
Adminrouter.get('/dashboard/getuserbyid/:id', isAdmin, GetUserById);
Adminrouter.post('/dashboard/updateuser/:id', isAdmin, UpdateUser);
Adminrouter.post('/dashboard/delete/:id', isAdmin , DeleteUser)
Adminrouter.post('/dashboard/toggle-activity/:id', isAdmin, ToggleUserActivity)

export default Adminrouter;