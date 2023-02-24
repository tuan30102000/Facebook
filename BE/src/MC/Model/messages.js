import Mongoose from "mongoose"
import conversations from "./conversations.js";

export const message = new Mongoose.Schema({
    sender: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    conversation: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'conversation' },
    active: {
        type: Boolean,
        default: true
    },
    content: { type: String, required: true },
    seen: { type: Boolean, default: false },
    deleteTime: { type: Number, required: false },
    createTime: {
        type: Number, required: true
    },


},
    { timestamps: true })

// message.pre(method, fn)

message.post('save', async function (doc, next) {
    const cv = await conversations.findByIdAndUpdate({ _id: doc.conversation }, { newMessage: { content: doc.content, createTime: Number(doc.createdAt), sender: doc.sender } }, { new: true })
    next();
});

export default Mongoose.model('message', message)