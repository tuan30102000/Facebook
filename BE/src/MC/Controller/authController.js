import bcrypt from 'bcrypt'
import JWT from "jsonwebtoken"
import user from "../Model/users.js"
function generateAccessToken(data = {}, time = '1h') {
    return JWT.sign({ _id: data._id, isAdmin: data.isAdmin }, process.env.SECRET_ACCESS_KEY, { expiresIn: time })
}
function generateRefreshToken(data = {}, time = '365d') {
    return JWT.sign({ _id: data._id, isAdmin: data.isAdmin }, process.env.SECRET_REFRESH_KEY, { expiresIn: time })

}
class authController {

    async register(req, res, next) {

        const { username, password, email, sex, birthDay } = req.body
        if (!username) return res.status(403).json({ message: 'username not exit' })
        if (!email) return res.status(403).json({ message: 'email not exit' })
        if (!password) return res.status(403).json({ message: 'password not exit' })
        if (password.length < 7) return res.status(403).json({ message: 'password length not enough' })

        try {
            const dataFindByUsername = await user.findOne({ username })
            console.log(dataFindByUsername)
            if (dataFindByUsername) return res.status(403).json({ message: 'Username already exists' })
            const dataFindByEmail = await user.findOne({ email })
            console.log(dataFindByEmail)
            if (dataFindByEmail) return res.status(403).json({ message: 'Email already exists' })
            //hash pass
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            // save user
            const newUser = new user({
                username, email, password: hashed, sex, birthDay
            })
            await newUser.save()
            next()
        } catch (error) {
            console.log('error', error)
            res.status(403).json(error)
        }


    }
    async refreshToken(req, res) {
        const { refreshToken } = req.body
        //not Exist rft
        if (!refreshToken) return res.status(401).json({ message: 'You\'re not authenticated', })
        const userData = await JWT.verify(refreshToken, process.env.SECRET_REFRESH_KEY)
        if (!userData) return res.status(403).json({ message: 'token not valid' })
        const newAccessToken = generateAccessToken(userData)
        const userDataCurrent = await user.findById(userData._id)
            .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
            .populate({ path: 'friend', select: 'avatarUrl displayName' })
        if (!userDataCurrent) return res.status(403).json({ message: 'user not exists' })
        res.status(200).json({ accessToken: newAccessToken, data: userDataCurrent })
    }
    async login(req, res) {
        const { username, password } = req.body
        if (!username) return res.status(403).json({ message: 'not have username' })
        if (!password) return res.status(403).json({ message: 'not have password' })
        try {
            const userData = await user.findOne({ username }).populate({ path: 'friendRequest', select: 'avatarUrl displayName' }).populate({ path: 'friend', select: 'avatarUrl displayName' }).select('+password')
            //
            if (!userData) return res.status(403).json({ message: 'user not Exist' })
            //
            const isCorrectPassword = await bcrypt.compare(password, userData.password)
            if (!isCorrectPassword) return res.status(403).json({ message: 'wrong password' })
            const accessToken = generateAccessToken(userData)
            const refreshToken = generateRefreshToken(userData)
            return res.status(200).json({ data: userData, accessToken, refreshToken })
        } catch (error) {

        }
    }


    async logout(req, res) {
        res.cookie.clear('refreshToken')
    }
    async deleteUser(req, res) {
        await user.deleteMany({})
        res.send('delete success')
    }
}

export default new authController()