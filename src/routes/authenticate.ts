
import { Router } from "express";
import AuthController from "src/controllers/authenticate";

const PREFIX = 'auth'
const authRouter = Router();

authRouter.post(`/${PREFIX}/login`, AuthController.login)
authRouter.post(`/${PREFIX}/register`, AuthController.register)


export default authRouter