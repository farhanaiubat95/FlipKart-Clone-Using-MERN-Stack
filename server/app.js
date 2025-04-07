import express from 'express';
import DefaultData from './default.js';
import cors from 'cors';
import bodyParser from 'body-parser';


// import routes
import UserRouter from './routes/userRoute.js';
import productRouter from './routes/productsRoute.js';


// Initialize express
const app = express();

// Initialize Default product Data
DefaultData();

// use cors
app.use(cors());

// use body-parser
 app.use(bodyParser.json({ extended: true })); // to show the body which fill up or post to the server
 app.use(bodyParser.urlencoded({ extended: true })); // handle URL space

// User Login & Signup
app.use('/',UserRouter);
app.use('/',productRouter);

export default app;