import dotenv from 'dotenv';
dotenv.config();

const jwt_Token = process.env.JWT_SECRETE;

export default jwt_Token;