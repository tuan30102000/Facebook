import { Router } from 'express'
import middlewareController from '../MC/Controller/middlewareController.js'
import userController from '../MC/Controller/userController.js'
import upload from '../multer/multer.js'

const userRouter = Router()
userRouter.patch('/avatar', upload.single('avatar'), middlewareController.verifyToken, userController.updateAvt)
userRouter.patch('/infor', middlewareController.verifyToken, userController.updateUserInfor)
userRouter.patch('/friend/request', middlewareController.verifyToken, middlewareController.checkFrienExist, userController.friendRequest)
userRouter.patch('/friend/reject', middlewareController.verifyToken, middlewareController.checkFrienExist, userController.rejectFriend)
userRouter.patch('/friend/accept', middlewareController.verifyToken, middlewareController.checkFrienExist, userController.acceptFriend)
userRouter.patch('/friend/remove', middlewareController.verifyToken, middlewareController.checkFrienExist, userController.removeFriend)
userRouter.get('/getall', middlewareController.verifyToken, userController.getUserAll)
// userRouter.get('/', userController.getUserAll)

export default userRouter