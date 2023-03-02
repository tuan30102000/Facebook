import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import http from "http";
import morgan from "morgan";
import db from "./src/config/db/db.js";
import { Server } from "socket.io";
import routes from "./src/routes/index.js";
import socketService from './src/MC/Service/socketService.js';
import middlewareController from './src/MC/Controller/middlewareController.js';
dotenv.config()
const feUrl = process.env.URL_FE || 'http://127.0.0.1:5173'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true, origin: /* " */[feUrl, 'http://localhost:3000',] }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser())
app.use(cookieParser())
// app.use(cookieParser())
// app.use(fileUpload({
//     createParentPath: true
// }));

//
app.use(express.static('public'));

//
db.connect()
app.use(morgan('combined'))
routes(app)
const httpServer = http.createServer(app)
export const io = new Server(httpServer, {
    cors: {
        origin: process.env.URL_FE,
        // origin: 'http://localhost:3000',
        credentials: true
    }
});

io.use(middlewareController.socketMiddleware)
io.on("connection", socketService.connection);
httpServer.listen(PORT, () => console.log('run' + PORT))
