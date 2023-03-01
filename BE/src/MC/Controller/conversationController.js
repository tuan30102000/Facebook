import { io } from '../../../index.js'
import manageUserRealtime from '../../constan/manageUserRealtime.js'
import conversation from '../Model/conversations.js'
import messages from '../Model/messages.js'
const { push, remove, get, getSocketId, getMany } = manageUserRealtime
const populateData = { path: 'members', select: 'displayName avatarUrl' }
class conversationController {
    async createConverSation(req, res) {
        const checkConverSation = await conversation.findOne({ members: { $all: req.members } })
        if (checkConverSation) return res.status(400).json({ message: 'conversation is exit' })
        try {
            const newConverSation = new conversation({
                members: req.members,
                name: req.user.displayName + req.member.displayName
            })
            await newConverSation.save()
            res.status(200).json(newConverSation)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    async seenConversation(req, res) {
        try {
            const cv = await conversation.findOneAndUpdate(
                {
                    _id: req.params.conversationId,
                    members: { $all: [req.user._id], },
                    'newMessage.sender': { $ne: req.user._id }
                },
                {
                    seen: true,
                    seenTime: Number(Date.now())
                },
                {
                    new: true
                })
            if (!cv) return res.status(400)
            // io.in(cv._id.toString()).emit('change-conversation', cv)
            io.to(getMany(cv.members)).emit('seen-message', cv)
            res.status(200)
        } catch (error) {
            console.log(error)
        }
    }
    async getConverSationsForUser(req, res) {
        const member = [req.user._id.toString()]
        try {
            const currentConversation = await conversation
                .find({ members: { $all: member }, active: true })
                .populate(populateData).sort({ 'newMessage.createTime': -1 })
            return res.status(200).json(currentConversation)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async checkConverSation(req, res) {
        try {
            const checkConverSation = await conversation
                .findOne({ members: { $all: req.members } })
            if (checkConverSation) return res
                .status(200)
                .json({ conversation: checkConverSation, isExist: true })
            return res.status(200).json({ conversation: null, isExist: false })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }


}

export default new conversationController()