import express from 'express';
import { AddToCart ,GetCart,RemoveFromCart} from '../controller/CustomerController.js';
import { requireSignin,isCustomer  } from '../middleware/VerifyToken.js';

const Customerrouter = express.Router();

Customerrouter.post('/cart/addtocart',requireSignin, isCustomer, AddToCart);    
Customerrouter.get('/cart/getcart', requireSignin, isCustomer, GetCart);
Customerrouter.delete('/remove/:id', requireSignin, isCustomer, RemoveFromCart);

export default Customerrouter;