import express from "express";
import cors from "cors"
import db from "./src/config/db/db.js";
import morgan from "morgan";
import routes from "./src/routes/index.js";
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(cookieParser())
db.connect()
app.use(morgan('combined'))
routes(app)
app.listen(PORT, () => {
    console.log('listen port' + PORT)
})


