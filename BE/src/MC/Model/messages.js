import Mongoose from "mongoose"
import { io } from "../../../index.js";
import manageUserRealtime from "../../constan/manageUserRealtime.js";
import conversations from "./conversations.js";
const { getSocketId, getMany } = manageUserRealtime
export const message = new Mongoose.Schema({
    sender: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    conversation: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'conversation' },
    active: {
        type: Boolean,
        default: true
    },
    content: { type: String, required: true },
    deleteTime: { type: Number, required: false },
    createTime: {
        type: Number, required: true
    },


},
    { timestamps: true })

// message.pre(method, fn)
const populateData = { path: 'members', select: 'displayName avatarUrl' }

message.post('save', async function (doc, next) {
    try {
        const cv = await conversations.findOneAndUpdate({ _id: doc.conversation }, { newMessage: { content: doc.content, createTime: Number(doc.createdAt), sender: doc.sender } }, { new: true }).populate(populateData)
        // io.to(getSocketId(cv.members[0]._id.toString())).to(getSocketId(cv.members[1]._id.toString())).emit('new-message', cv)
        io.to(getMany(cv.members)).emit('new-message', cv)
        next();
    } catch (error) {
        console.log(error)
    }
});

export default Mongoose.model('message', message)