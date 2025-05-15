import express from 'express';
import { isSeller } from '../middleware/VerifyToken.js';
import { CreateProduct, UpdateProduct, DeleteProduct } from '../controller/SellerController.js';
import { nanoid } from 'nanoid';
import multer from 'multer';
import path from 'path';

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

// Accept up to 5 files under the field name 'images'
Sellerrouter.post('/dashboard/create-product',isSeller,upload.array('productImage'),CreateProduct);
Sellerrouter.put('/update-product/:id',isSeller,upload.array('productImage'),UpdateProduct);
Sellerrouter.delete('/delete-product/:id',isSeller,DeleteProduct);

export default Sellerrouter;
