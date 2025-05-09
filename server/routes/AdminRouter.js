import express from 'express';
import { Getuser , DeleteUser, ToggleUserActivity, GetUserById,UpdateUser, CreateCategory,GetAllCategories} from '../controller/Admincontroller.js';
import { isAdmin } from '../middleware/VerifyToken.js';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
const Adminrouter = express.Router();

// Configure multer to handle file uploads
const __dirname = path.resolve();
const Sellerrouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueId = nanoid(2);
    cb(null, uniqueId + '-' + file.originalname);
  },
});

const upload = multer({ storage });
// Add Categories
Adminrouter.post('/dashboard/createproduct',isAdmin,upload.single('categoryImage'),CreateCategory);


Adminrouter.get('/dashboard/getuser', isAdmin , Getuser)
Adminrouter.get('/dashboard/getuserbyid/:id', isAdmin, GetUserById);
Adminrouter.post('/dashboard/updateuser/:id', isAdmin, UpdateUser);
Adminrouter.post('/dashboard/delete/:id', isAdmin , DeleteUser)
Adminrouter.post('/dashboard/toggle-activity/:id', isAdmin, ToggleUserActivity)

Adminrouter.get('/dashboard/getcategories', isAdmin, GetAllCategories)

export default Adminrouter;