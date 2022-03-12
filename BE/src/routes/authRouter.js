import { Router } from "express";
import authController from "../MC/Controller/authController.js";

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/refresh', authController.refreshToken)
authRouter.get('/delete', authController.deleteUser)

export default authRouter