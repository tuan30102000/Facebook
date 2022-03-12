import Mongoose from "mongoose"

const postSchema = new Mongoose.Schema({
    ownerId:{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    imgUrl: {
        type: Array,
        default: []
    },
    content: {
        type: String,
        default: '',
    },
    like:[{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }]
})



export default Mongoose.model('post', postSchema)