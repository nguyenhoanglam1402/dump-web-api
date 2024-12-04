// src/controllers/user.ts
import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';
import User from 'src/models/user.model';
import { catchError } from 'src/decoration/http-catch';
import { login, register } from '@services/authenticate';

class AuthenticateController {
  // Register a new user
  @catchError
  public async register(req: Request, res: Response): Promise<void> {
    const { email, password, name, phone, address } = req.body;
    const result = await register(
      { email, password, name, phone, address }
    )
    res.status(200).json({ message: "Register successfully", result })
  }

  // Login an existing user
  @catchError
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await login(email, password)
    res.status(200).json({ message: "Login successfully", result })
  }
}

export default new AuthenticateController()
