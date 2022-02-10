import Mongoose from "mongoose"
import ENV from "../../../constan.js"

const db = {
    async connect() {
        try {
            await Mongoose.connect(ENV.DB_URL_CONNECT)
            console.log('connect sucessfully')
        } catch (error) {
            console.log('connect fail')            
        }
    }
}

export default db