import conversation from '../Model/conversations.js'
import messages from '../Model/messages.js'
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
    async getConverSation(req, res) {
        const { memberId } = req.body
        const member = [req.user._id.toString(), memberId]

        try {
            const currentConversation = await conversation.findOne({ members: { $tag: member }, active: true }).populate(populateData)
            if (currentConversation) return res.status(400).json({ message: 'conversation Not found' })
            return res.status(400).json(currentConversation)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async getConverSationsForUser(req, res) {
        const member = [req.user._id.toString()]
        try {
            const currentConversation = await conversation.find({ members: { $all: member }, active: true }).populate(populateData).sort({ 'newMessage.createTime': -1 })
            return res.status(200).json(currentConversation)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async checkConverSation(req, res, next) {
        try {
            const checkConverSation = await conversation.findOne({ members: { $all: req.members } })
            if (checkConverSation) return res.status(200).json({ conversation: checkConverSation, isExist: true })
            return res.status(200).json({ conversation: null, isExist: false })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }


}

export default new conversationController()