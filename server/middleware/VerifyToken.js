import jwt from "jsonwebtoken";
import jwt_Token from "../dotenv/JWT_Token.js";
import userModel from "../model/userModel.js";


// This middleware checks if the user is authenticated
export const isAdmin=async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const decoded = jwt.verify(token, jwt_Token);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized access : User is not an admin " });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}


// This middleware checks if the user is a seller
export const isSeller = async (req, res, next) => {
  try {
    let token;

    // Prefer token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Fallback: check cookies if header not found
    if (!token && req.cookies.token) {
      token = req.cookies.token;
      
    }



    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, jwt_Token);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ message: "Unauthorized: Not a seller" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


// This middleware checks if the user is a customer
export const isCustomer=async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const decoded = jwt.verify(token, jwt_Token);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        if (user.role !== "customer") {
            
            return res.status(403).json({ message: "Unauthorized access : User is not a customer" });

        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

// requireSignin
export const requireSignin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token found", error: error.message });
        }
        const decoded = jwt.verify(token, jwt_Token);
        const user = await userModel.findById(decoded.userId);
       if (!token) {
         return res.status(401).json({ message: "No token found" }); // ✅ Removed error.message
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


