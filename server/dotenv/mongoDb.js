import dotenv from 'dotenv';
dotenv.config();

const mongoDb_URL = process.env.MONGODB_ATLAS_URL ||'mongodb://localhost:27017/Flipkart';

export default mongoDb_URL;