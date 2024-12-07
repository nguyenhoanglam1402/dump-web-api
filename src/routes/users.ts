import { Router } from "express";
import UserController from "src/controllers/user";
import { authenticate } from "src/middleware/auth";

const PREFIX = 'user'
const userRouter = Router();

userRouter.get(`/${PREFIX}/:email`, UserController.get)
// userRouter.post(`/${PREFIX}`, authenticate as any, UserController.)

export default userRouter