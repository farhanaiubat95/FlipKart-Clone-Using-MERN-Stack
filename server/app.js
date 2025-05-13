import express from 'express';
// import DefaultData from './default.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

// import routes
// import UserRouter from './routes/userRoute.js';
import paymentRouter from './routes/paymentRouter.js';
import Authrouters from './routes/AuthRouter.js';
import Adminrouter from './routes/AdminRouter.js';
import Sellerrouter from './routes/SellerRouter.js';
import Customerrouter from './routes/CustomerRouter.js';
import path from 'path';


// Initialize express
const app = express();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Serve uploads folder publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize cookie-parser
app.use(cookieParser());

// Initialize Default product Data
// DefaultData();

// use cors
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


// use body-parser
 app.use(bodyParser.json({ extended: true })); // to show the body which fill up or post to the server
 app.use(bodyParser.urlencoded({ extended: true })); // handle URL space
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

// User Login & register
app.use('/', Authrouters)
app.use('/admin', Adminrouter)
app.use('/seller', Sellerrouter)
app.use('/customer', Customerrouter)

app.use('/',paymentRouter);

export default app;