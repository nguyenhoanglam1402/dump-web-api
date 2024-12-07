// src/controllers/user.ts
import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';
import User from 'src/models/user.model';
import { catchError } from 'src/decoration/http-catch';
import { getUserByEmail } from '@services/user';

class UserController {
  // Register a new user
  @catchError
  public async get(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    console.log("🚀 ~ UserController ~ get ~ email:", email)
    const result = await getUserByEmail(
      email
    )
    res.status(200).json({ message: "Fetch ok", result })
  }

  // // Login an existing user
  // @catchError
  // public async login(req: Request, res: Response): Promise<void> {
  //   const { email, password } = req.body;
  //   const result = await login(email, password)
  //   res.status(200).json({ message: "Login successfully", result })
  // }
}

export default new UserController()
