import comment from "../Model/comments.js"
import { io } from '../../../index.js'
const populateData = { path: 'owner', select: 'displayName avatarUrl' }

class commentController {
    getComment(req, res) { }
    async createComment(req, res) {
        try {
            const newCm = new comment({
                post: req.postCurrent._id,
                owner: req.user._id,
                content: req.body.comment
            })
            await newCm.save()
            io.emit('create-comment', { ...newCm._doc, owner: { _id: req.user._id, displayName: req.user.displayName, avatarUrl: req.user.avatarUrl } })
            res.status(200).json(newCm)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }


    

    }
    async getCommentInPost(req, res) {
        try {
            const listComment = await comment.find({ post: req.postCurrent._id, active: true }).populate(populateData)
            res.status(200).json(listComment)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }

    }
    async removeComment(req, res) {
        try {
            await comment.updateOne({ _id: req.commentCurrent._id }, { $set: { active: false } })
            io.emit('delete-comment', req.commentCurrent._id)
            res.status(200).json({ message: 'success' })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async editComment(req, res) {
        if (!req.body.comment) return res.status(404).json({ message: 'no have content' })
        try {
            const newCmt = await comment.findOneAndUpdate({ _id: req.commentCurrent._id }, { $set: { content: req.body.comment } }, { new: true }).populate(populateData)
            io.emit('edit-comment', newCmt)
            res.status(200).json({ message: 'success' })

        } catch (error) {
            res.status(400).json(error)
        }
    }


}

export default new commentController()