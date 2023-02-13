import Mongoose from "mongoose"

const commentSchema = new Mongoose.Schema({
    owner: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    post: { type: Mongoose.Schema.Types.ObjectId, ref: 'post' },
    content: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true })



export default Mongoose.model('comment', commentSchema)