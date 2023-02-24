import Mongoose from "mongoose"

const conversation = new Mongoose.Schema({
    members: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }],
    name: { type: String, default: 'Cuoc tro chuyen' },
    active: {
        type: Boolean,
        default: true
    },
    newMessage: { content: String, createTime: Number, sender: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' } }
},
    { timestamps: true })



export default Mongoose.model('conversation', conversation)