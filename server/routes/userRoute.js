import express from'express';

// import controller
import { authMiddleware } from '../middleware/authMiddleware.js';
import { userSignup ,userLogin, getUserDetails} from '../controller/userController.js';
// import { getProducts } from '../controller/productsController.js';

const router = express.Router();

router.post('/signup',userSignup );
router.post('/login',userLogin );
router.get('/me',authMiddleware,getUserDetails);

// router.get('/products',getProducts );

export default router;