import express from 'express';
import { Getuser , DeleteUser} from '../controller/Admincontroller.js';
import { isCustomer } from '../middleware/VerifyToken.js';

const Customerrouter = express.Router();

Customerrouter.get('/dashboard', isCustomer , Getuser)
Customerrouter.post('/delete/:id', isCustomer , DeleteUser)

export default Customerrouter;