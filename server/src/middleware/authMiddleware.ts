import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Define the structure of your User data inside the JWT
export interface UserPayload {
  id: string;
  // add other fields if you packed them into the token, e.g. email
}

// 2. Extend the standard Request interface locally
// Use this interface in your Controllers if you need to access req.user
export interface AuthRequest extends Request {
  user?: UserPayload;
}

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ message: 'Not authorized, no token found' });
        return; 
      }

      // FIX 1: Cast the result of jwt.verify to UserPayload
      // This tells TS: "Trust me, the decoded token has an 'id'"
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

      // FIX 2: Cast 'req' to 'AuthRequest' to attach the user property
      // We use (req as AuthRequest) because standard 'req' doesn't have .user
      (req as AuthRequest).user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;