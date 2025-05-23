import express from'express';

// import controller
import { postOrder , postSuccess } from '../controller/paymentController.js';

const paymentRouter = express.Router();

// get all products
paymentRouter.post('/payment',postOrder); 
paymentRouter.post('/payment-success/:tran_id',postSuccess);

export default paymentRouter;