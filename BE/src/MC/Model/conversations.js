import Mongoose from "mongoose";
import { io } from "../../../index.js";
const conversation = new Mongoose.Schema({
    members: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }],
    name: { type: String, default: 'Cuoc tro chuyen' },
    active: {
        type: Boolean,
        default: true
    },
    seen: { type: Boolean, default: false },
    seenTime: Date,
    newMessage: {
        content: String,
        createTime: Number,
        sender: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
        _id: Mongoose.Schema.Types.ObjectId
    }
},
    { timestamps: true })

conversation.post('findOneAndUpdate', async function (doc, next) {
    doc && io.in(doc?._id.toString()).emit('change-conversation', doc)
    next();
});

export default Mongoose.model('conversation', conversation)