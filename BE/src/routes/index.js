import authRouter from "./authRouter.js";
import conversationRouter from "./conversationRouter.js";
import messageRouter from "./messageRouter.js";
import notifyRouter from "./notifyRouter.js";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";

export default function (app) {
    console.log('run router')
    // app.all('/auth', function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     authRouter()
    // });
    app.use('/auth', authRouter)
    app.use('/post', postRouter)
    app.use('/user', userRouter)
    app.use('/conversation', conversationRouter)
    app.use('/message', messageRouter)
    app.use('/notify', notifyRouter)

}