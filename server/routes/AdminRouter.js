import express from 'express';
import { Getuser , DeleteUser} from '../controller/Admincontroller.js';
import { isAdmin } from '../middleware/VerifyToken.js';

const Adminrouter = express.Router();

Adminrouter.get('/dashboard/getuser', isAdmin , Getuser)
Adminrouter.post('/delete/:id', isAdmin , DeleteUser)

export default Adminrouter;