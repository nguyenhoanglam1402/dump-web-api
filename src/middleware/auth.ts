// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Store decoded token (user info) in request object
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
