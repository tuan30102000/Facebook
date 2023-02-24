import { Router } from "express";
import messageController from "../MC/Controller/messageController.js";
import middlewareController from "../MC/Controller/middlewareController.js";

const messageRouter = Router()

messageRouter.post('/create/:conversationId', middlewareController.verifyToken,middlewareController.verifyConversation, messageController.createMessage)
messageRouter.get('/get/:conversationId', middlewareController.verifyToken, middlewareController.verifyConversation, messageController.getMessage)
messageRouter.get('/delete', messageController.delete)

export default messageRouter