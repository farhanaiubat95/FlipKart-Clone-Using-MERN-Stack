import express from 'express';
import { AddToCart ,} from '../controller/CustomerController.js';
import { requireSignin,isCustomer } from '../middleware/VerifyToken.js';

const CartRouter = express.Router();

CartRouter.post('/cart/addtocart',requireSignin, isCustomer, AddToCart);    
// CartRouter.get('/cart/getcart',GetCart);

export default CartRouter;