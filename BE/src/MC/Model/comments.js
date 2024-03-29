import Mongoose from "mongoose"

const commentSchema = new Mongoose.Schema({
    owner: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    post: { type: Mongoose.Schema.Types.ObjectId, ref: 'post' },
    content: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    like: [],
    create: { type: Number, default: Date.now }
},
    { timestamps: true })



export default Mongoose.model('comment', commentSchema)