import { Router } from "express";
import messageController from "../MC/Controller/messageController.js";
import middlewareController from "../MC/Controller/middlewareController.js";
import notifyController from "../MC/Controller/notifyController.js";

const notifyRouter = Router()

// notifyRouter.get('/all', notifyController)
notifyRouter.get('/', middlewareController.verifyToken, notifyController.getNotifyNotRead)
notifyRouter.patch('/read/all', middlewareController.verifyToken, notifyController.readAllNotify)
notifyRouter.patch('/read/:notifyId', middlewareController.verifyToken, notifyController.readNotify)

export default notifyRouter