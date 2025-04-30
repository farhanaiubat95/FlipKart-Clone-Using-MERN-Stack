import express from 'express';
import {Signup, Login, Logout} from '../controller/AuthController.js';

const Authrouters = express.Router();

Authrouters.post('/signup', Signup);
Authrouters.post('/login', Login);
Authrouters.post('/logout', Logout);

export default Authrouters;