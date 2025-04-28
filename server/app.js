import express from 'express';
// import DefaultData from './default.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// import routes
// import UserRouter from './routes/userRoute.js';
import productRouter from './routes/productsRoute.js';
import paymentRouter from './routes/paymentRouter.js';
import Authrouters from './routes/AuthRouter.js';
import Adminrouter from './routes/AdminRouter.js';

// Initialize express
const app = express();

// Initialize cookie-parser
app.use(cookieParser());

// Initialize Default product Data
// DefaultData();

// use cors
app.use(cors());


// use body-parser
 app.use(bodyParser.json({ extended: true })); // to show the body which fill up or post to the server
 app.use(bodyParser.urlencoded({ extended: true })); // handle URL space


// User Login & register
app.use('/auth', Authrouters)
app.use('/admin', Adminrouter)
app.use('/',productRouter);
app.use('/',paymentRouter);

export default app;