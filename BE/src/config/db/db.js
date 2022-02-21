import Mongoose from "mongoose"

const db = {
    async connect() {
        try {
            await Mongoose.connect(process.env.MONGODB_URL)
            console.log('connect sucessfully')
        } catch (error) {
            console.log('connect fail')
        }
    }
}

export default db