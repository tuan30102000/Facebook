import Mongoose from "mongoose"
import listDefalult from "../../constan/listDefault.js"

const postSchema = new Mongoose.Schema({
    owner: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    imgUrl: {
        type: Array,
        default: []
    },
    content: {
        type: String,
        default: '',
    },
    like: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }],
    privateType: {
        type: String,
        default: listDefalult.typePrivate[0],
        enum: listDefalult.typePrivate,

    },
    score: { type: Number, default: 0 },
    countComment: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    sendNotify: { type: Array, default: [], ref: 'user' },
    tag: { type: Array, default: [], ref: 'user' }
},
{ timestamps: true })



export default Mongoose.model('post', postSchema)