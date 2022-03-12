import jwt from "jsonwebtoken"
import post from "../Model/post.js";
class middlewareController {
    verifyToken(req, res, next) {
        const token = req.headers.accesstoken;
        if (!token) return res.status(401).json("You're not authenticated");

        const accessToken = token.split(" ")[1];
        //token is not valid
        try {
            const user = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY)
            req.user = user.data
            console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'token is not valid' })
        }
        //token valid
    }

    async verifyPost(req, res, next) {
        const { postId } = req.params
        try {
            const postCurrent = await post.findById(req.params.postId)
            if (req.user._id != postCurrent.ownerId) return res.status(403).json({ message: 'not enough jurisdiction' })
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'can connect Db' })
        }
    }
}

export default new middlewareController()