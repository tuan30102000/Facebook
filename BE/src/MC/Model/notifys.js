import mongoose from "mongoose";
import listDefalult from "../../constan/listDefault.js";



const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    receiver: { type: Array, default: [], ref: 'user' },
    type: {
        type: String,
        enum: listDefalult.typeActionNotify,
        required: true,
    },
    reads: {
        type: Array,
        default: [],
        ref: 'user'
    },
    id: {
        type: String,
        required: true
    },
    createTime: {
        type: Number,
        default: Date.now,
    },

}, { timestamps: true });


// notificationSchema.post('save', (doc) => {
//     // io.to(getMany(cv.members)).emit('new-message', doc)

// })
export default mongoose.model('notify', notificationSchema)