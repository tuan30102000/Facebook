import { Router } from "express";
import conversationController from "../MC/Controller/conversationController.js";
import middlewareController from "../MC/Controller/middlewareController.js";

const conversationRouter = Router()
// conversationRouter.get('/conversation', middlewareController.verifyToken, conversationController.getConverSation)
conversationRouter.get('/get', middlewareController.verifyToken, conversationController.getConverSationsForUser)
conversationRouter.post('/create', middlewareController.verifyToken, middlewareController.verifyMember, conversationController.createConverSation)
conversationRouter.get('/check/:memberId', middlewareController.verifyToken, middlewareController.verifyMember, conversationController.checkConverSation)

// conversationRouter.get('/message', middlewareController.verifyToken, conversationController.getConverSationsForUser)

export default conversationRouter