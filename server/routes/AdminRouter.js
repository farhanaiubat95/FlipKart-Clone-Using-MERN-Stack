import express from 'express';
import { Getuser , DeleteUser, ToggleUserActivity, GetUserById,UpdateUser, CreateCategory,GetAllCategories, DeleteCategory, UpdateCategory} from '../controller/Admincontroller.js';
import { isAdmin } from '../middleware/VerifyToken.js';
import { nanoid } from 'nanoid';
import multer from 'multer';
import path from 'path';
// import fs from 'fs';
const Adminrouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueId = nanoid(2);
    cb(null, uniqueId + '-'+file.originalname , path.extname(file.originalname));
  }
});

const upload = multer({ storage });

Adminrouter.get('/dashboard/getuser', isAdmin , Getuser)
Adminrouter.get('/dashboard/getuserbyid/:id', isAdmin, GetUserById);
Adminrouter.post('/dashboard/updateuser/:id', isAdmin, UpdateUser);
Adminrouter.post('/dashboard/delete/:id', isAdmin , DeleteUser)
Adminrouter.post('/dashboard/toggle-activity/:id', isAdmin, ToggleUserActivity)

// Category Image
Adminrouter.post('/upload', upload.single('categoryImage'), CreateCategory);
Adminrouter.get('/allcategories', GetAllCategories)
Adminrouter.put('/updatecategory/:id', upload.single('categoryImage'), UpdateCategory);
Adminrouter.delete('/deletecategory/:id', DeleteCategory);
export default Adminrouter;