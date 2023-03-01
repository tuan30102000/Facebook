import jwt from "jsonwebtoken"
import post from "../Model/posts.js";
import users from "../Model/users.js";
import comment from "../Model/comments.js"
import conversations from "../Model/conversations.js";
class middlewareController {
    //authToken
    async verifyToken(req, res, next) {
        const token = req.headers.accesstoken;
        if (!token) return res.status(401).json("You're not authenticated");

        const accessToken = token.split(" ")[1];
        //token is not valid
        try {
            const user = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY)
            const userData = await users.findById(user._id)
            if (!userData) return res.status(403).json({ message: 'token is not valid' })
            req.user = userData
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'something wrong' })
        }
        //token valid
    }
    //post
    async verifyPost(req, res, next) {
        try {
            const postCurrent = await post.findById(req.params.postId)
            if (!postCurrent) return res.status(403).json({ message: 'post not found' })
            req.postCurrent = postCurrent
            next()
            // if (req.user._id.toString() != postCurrent.owner.toString()) return res.status(403).json({ message: 'not enough jurisdiction' })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'can connect Db' })
        }
    }

    async verifyComment(req, res, next) {
        try {
            const commentCurrent = await comment.findOne({ _id: req.params.commentId, active: true })
            console.log(commentCurrent.post.toString(), req.postCurrent._id.toString())
            if (!commentCurrent) return res.status(400).json({ message: 'comment not found' })
            if (commentCurrent.post.toString() != req.postCurrent._id.toString()) return res.status(403).json({ message: 'comment not in this post' })
            req.commentCurrent = commentCurrent
            next()
            // if (req.user._id.toString() != postCurrent.owner.toString()) return res.status(403).json({ message: 'not enough jurisdiction' })
        } catch (error) {
            return res.status(403).json(error)
        }
    }
    async isOwmerPost(req, res, next) {
        const { postCurrent } = req
        if (req.user._id.toString() != postCurrent.owner.toString()) return res.status(403).json({ message: 'not enough jurisdiction' })
        next()
    }
    verifyRoleDeleteComment(req, res, next) {

        if (req.user._id.toString() == req.commentCurrent.owner.toString()) return next() //owner cmt
        if (req.user._id.toString() == req.postCurrent.owner.toString()) return next() // post
        return res.status(400).json({ message: 'not role delete' })
    }
    verifyRoleEditComment(req, res, next) {

        if (req.user._id.toString() == req.commentCurrent.owner.toString()) return next()
        return res.status(400).json({ message: 'not role editComment' })
    }
    async checkFrienExist(req, res, next) {
        const requestId = req.user._id
        const { friendId, action } = req.body
        const actionList = ['request', 'accept', 'reject', 'remove', 'cancel']
        if (!actionList.includes(action)) return res.status(403).json({ message: 'action not found' })
        if (friendId == requestId) return res.status(400).json({ message: 'can add yourself' })
        try {
            const friend = await users.findById(friendId)
            if (!friend) return res.status(403).json({ message: 'user not Exist' })
            req.friend = friend
            next()
        } catch (error) {

        }
    }
    //post
    //socket
    async socketMiddleware(socket, next) {
        try {
            const header = socket.handshake.headers
            const accessToken = header.accesstoken
            if (!accessToken) return next(new Error('No login'))
            socket.user = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY)
            next()
        } catch (error) {
            console.log(error)
            next(new Error('token expires'))
        }
    }
    //socket
    //conversation
    async verifyConversation(req, res, next) {
        try {
            // console.log(req.params)
            // res.status(200)
            const currentConversation = await conversations.findOne({ members: { $all: req.user._id, }, _id: req.params.conversationId, active: true })
            if (!currentConversation) return res.status(400)
            req.currentConversation=currentConversation
            next()
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async verifyMember(req, res, next) {
        const memberId = req.body.memberId ? req.body.memberId : req.params.memberId
        try {
            const member = await users.findById(memberId)
            if (!member) return res.status(400).json({ message: 'member not found' })
            req.member = member
            req.members = [member._id.toString(), req.user._id.toString()]
            next()
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    //conversation

}

export default new middlewareController()