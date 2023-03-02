import { Router } from 'express'
import middlewareController from '../MC/Controller/middlewareController.js'
import userController from '../MC/Controller/userController.js'
import upload from '../multer/multer.js'

const userRouter = Router()
userRouter.patch('/avatar', upload.single('avatar'), middlewareController.verifyToken, userController.updateAvt)
userRouter.patch('/coverAvatar', upload.single('coverAvatar'), middlewareController.verifyToken,userController.updateCoverAvt)
userRouter.patch('/infor', middlewareController.verifyToken, userController.updateUserInfor)
userRouter.patch('/friend', middlewareController.verifyToken, middlewareController.checkFrienExist, userController.handleFriend)
userRouter.get('/search', middlewareController.verifyToken, userController.searchUser)
userRouter.get('/getall', middlewareController.verifyToken, userController.getUserAll)
userRouter.get('/get/:userId', userController.getUserById)
userRouter.get('/suggest', userController.suggestionsUserAutocomplete)
userRouter.post('/logout', middlewareController.verifyToken, userController.logout)

// userRouter.get('/', userController.getUserAll)



export default userRouter