import express from 'express';
import { Getuser , DeleteUser} from '../controller/Admincontroller.js';
import { isSeller } from '../middleware/VerifyToken.js';

const Sellerrouter = express.Router();

Sellerrouter.get('/dashboard', isSeller , Getuser)
Sellerrouter.post('/delete/:id', isSeller , DeleteUser)

export default Sellerrouter;