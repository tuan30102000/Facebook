import comment from "../Model/comments.js"

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
            res.status(200).json({ message: 'success' })
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async editComment(req, res) {
        try {
            await comment.updateOne({ _id: req.commentCurrent._id }, { $set: { content: req.body.comment } })
            res.status(200).json({ message: 'success' })
        } catch (error) {
            res.status(400).json(error)
        }
    }


}

export default new commentController()