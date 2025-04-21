import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'; // or wherever your User model is

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is in your .env

      req.user = await User.findById(decoded.id).select('-password'); // Attach user info except password

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};
