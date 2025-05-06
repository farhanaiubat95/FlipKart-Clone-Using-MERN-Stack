import express from 'express';
import {Signup, Login, Logout, VerifyEmail,UpdateUser,GetAllProducts,GetAllCategories} from '../controller/AuthController.js';

const Authrouters = express.Router();

Authrouters.post('/signup', Signup);
Authrouters.post('/login', Login);
Authrouters.post('/logout', Logout);

Authrouters.put('/update-profile/:id', UpdateUser);

Authrouters.post('/verifyemail', VerifyEmail);

Authrouters.get('/allproducts',GetAllProducts);
Authrouters.get('/allcategories',GetAllCategories);

export default Authrouters;