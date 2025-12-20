import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Not authorized, no token found" });
        return;
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as UserPayload;

      (req as AuthRequest).user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
