import express from'express';

// import controller
import {getProducts,getProductById} from '../controller/productsController.js';

const productRouter = express.Router();

// get all products
productRouter.get('/products',getProducts); 
productRouter.get('/product/:id',getProductById); // get product by id


export default productRouter;