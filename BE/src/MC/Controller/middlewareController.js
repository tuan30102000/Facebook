import jwt from "jsonwebtoken"
class middlewareController {
    async verifyToken(req, res, next) {
        const token = req.headers.token;
        if (!token) return res.status(401).json("You're not authenticated");

        const accessToken = token.split(" ")[1];
        const isCorrectToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY)
        //token is not valid
        if (!isCorrectToken) return res.status(403).json({ message: 'token is not valid' })
        //token valid
        next()

    }
}

export default middlewareController