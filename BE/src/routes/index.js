import authRouter from "./authRouter.js";

export default function (app) {
    console.log('run router')
    // app.all('/auth', function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     authRouter()
    // });
    app.use('/auth', authRouter)
}