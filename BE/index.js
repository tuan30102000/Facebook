import express from "express";
import cors from "cors"
import db from "./src/config/db/db.js";
import morgan from "morgan";
import routes from "./src/routes/index.js";

const app = express()
const PORT = process.env.PORT || 3000
app.use(
    express.urlencoded({
        extended: true
    })
)
db.connect()
app.use(cors())
app.use(morgan('combined'))
routes(app)
app.listen(PORT, () => {
    console.log('listen port' + PORT)
})


