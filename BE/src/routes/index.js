import authRouter from "./authRouter.js";

export default function (app) {
    console.log('run router')
    app.use('/auth',authRouter)
}