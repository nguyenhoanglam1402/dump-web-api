// src/utils/auth.ts
import jwt from 'jsonwebtoken';
import User from 'src/models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Store in .env for security

// Generate JWT token
export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
