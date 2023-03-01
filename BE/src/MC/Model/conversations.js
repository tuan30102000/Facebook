import Mongoose from "mongoose";
import manageUserRealtime from "../../constan/manageUserRealtime.js";
const conversation = new Mongoose.Schema({
    members: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }],
    name: { type: String, default: 'Cuoc tro chuyen' },
    active: {
        type: Boolean,
        default: true
    },
    seen: { type: Boolean, default: false },
    seenTime: Date,
    newMessage: { content: String, createTime: Number, sender: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' } }
},
    { timestamps: true })

// conversation.post('findOneAndUpdate', async function (doc, next) {
//     try {
//         const members = await users.find({ _id: { $in: doc.members } }).select('avatarUrl displayName')
//         doc.members = members
//         io.to(getSocketId(doc.members[0]._id.toString())).to(getSocketId(doc.members[1]._id.toString())).emit('new-message', doc)
//     } catch (error) {
//         console.log(error)
//     }
//     next();
// });

export default Mongoose.model('conversation', conversation)