import comment from "../Model/comments.js"
import { io } from '../../../index.js'
import notifyController from "./notifyController.js"
import posts from "../Model/posts.js"
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
            const saveComent = newCm.save()
            const newNotify = notifyController.createNotify(req, 'post', 'bình luận')
            const updatePost = posts.updateOne(
                { _id: req.postCurrent._id },
                {
                    $inc: {
                        countComment: 1, score: 1
                    }
                })
            const listPrm = [newNotify, saveComent, updatePost]
            await Promise.all(listPrm)
            io.in(req.postCurrent._id.toString()).emit('create-comment', { ...newCm._doc, owner: { _id: req.user._id, displayName: req.user.displayName, avatarUrl: req.user.avatarUrl } })
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
            const removeComment = comment.updateOne({ _id: req.commentCurrent._id }, { $set: { active: false } })
            const updatePost = posts.updateOne(
                { _id: req.postCurrent._id },
                {
                    $inc: {
                        countComment: -1,
                    }
                })
            const listPrm = [removeComment, updatePost]
            await Promise.all(listPrm)
            io.in(req.postCurrent._id.toString()).emit('delete-comment', req.commentCurrent._id)
            res.status(200).json({ message: 'success' })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async editComment(req, res) {
        if (!req.body.comment) return res.status(404).json({ message: 'no have content' })
        try {
            const newCmt = await comment.findOneAndUpdate({ _id: req.commentCurrent._id }, { $set: { content: req.body.comment } }, { new: true }).populate(populateData)
            io.in(req.postCurrent._id.toString()).emit('edit-comment', newCmt)
            res.status(200).json({ message: 'success' })

        } catch (error) {
            res.status(400).json(error)
        }
    }
    async reactComment(req, res) {
        const { action } = req.body
        const { commentId } = req.params
        const actionList = ['like', 'unlike']
        if (!actionList.includes(action)) return res.status(403).json({ message: 'action not found' })
        try {
            if (action == 'like') {
                await comment.updateOne({ _id: commentId }, { $addToSet: { like: ObjectId(req.user._id) } })
                const newNotify = notifyController.createNotify(req, 'post', 'thích')
                await newNotify
                return res.status(200).json({ message: 'like done' })
            }
            if (action == 'unlike') {
                await comment.updateOne({ _id: commentId }, { $pull: { like: ObjectId(req.user._id) } })
                return res.status(200).json({ message: 'unlike done' })
            }

        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }

}

export default new commentController()