import express from 'express';
import {Signup, Login, Logout, VerifyEmail} from '../controller/AuthController.js';

const Authrouters = express.Router();

Authrouters.post('/signup', Signup);
Authrouters.post('/login', Login);
Authrouters.post('/logout', Logout);

Authrouters.post('/verifyemail', VerifyEmail);

export default Authrouters;