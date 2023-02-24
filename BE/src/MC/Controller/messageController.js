import messages from "../Model/messages.js"
import conversations from "../Model/conversations.js"
class messageController {
    async getMessage(req, res) {
        try {
            const messageList = await messages.find({ conversation: req.currentConversation._id }).sort({ createTime: 1 })
            res.status(200).json(messageList)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async createMessage(req, res) {
        try {
            const newMessage = new messages({ conversation: req.currentConversation._id, sender: req.user._id, content: req.body.message, createTime: Number(Date.now()) })
            await newMessage.save()
            res.status(200).json(newMessage)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async regainMessage() { }
    async delete(req, res) {
        await messages.deleteMany({})
        await conversations.deleteMany({})
        return res.status(200).json({ message: 'delete successfully' })
    }
}

export default new messageController()