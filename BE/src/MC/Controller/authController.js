import JWT from "jsonwebtoken"
import user from "../Model/users.js"
import bcrypt from 'bcrypt'
import mongooseToObject from "../until/mogooseToObj.js"
function generateAccessToken(data = {}, time = '1h') {
    return JWT.sign({ _id: data._id, isAdmin: data.isAdmin }, process.env.SECRET_ACCESS_KEY, { expiresIn: time })
}
function generateRefreshToken(data = {}, time = '365d') {
    return JWT.sign({ _id: data._id, isAdmin: data.isAdmin }, process.env.SECRET_REFRESH_KEY, { expiresIn: time })

}
class authController {

    async register(req, res) {

        const { username, password, email, sex, birthDay } = req.body
        const isEnoughtData = username && password && email
        if (isEnoughtData) {
            try {
                const checkDataName = await user.findOne({ username })
                const checkDataEmail = await user.findOne({ email })
                const isUserExist = checkDataName || checkDataEmail
                if (isUserExist) return res.status(403).json({ message: checkDataName ? 'username is exit' : 'email is Exist' })
                //hash pass
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                // save user
                const newUser = new user({
                    username, email, password: hashed, sex, birthDay
                })
                const useAfterCreate = await newUser.save()
                const userData = await user.findOne({ username }).populate({ path: 'friendRequest', select: 'avatarUrl displayName' }).populate({ path: 'friend', select: 'avatarUrl displayName' })
                const accessToken = generateAccessToken(userData)
                const refreshToken = generateRefreshToken(userData)
                res.status(200).json({ data: userData, accessToken, refreshToken })
            } catch (error) {
                console.log('error', error)
                res.status(403).json(error)
            }
        } else {
            if (!username && !password) {
                res.status(403).send('name or password is not Exist')
            } else res.status(403).send('password length is not enough')
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
        res.status(200).json({ accessToken: newAccessToken, data: userDataCurrent })
    }
    // async login(req, res) {
    //     const { username, password, } = req.body


    //     if (!(username && password)) {
    //         console.log(req.body)
    //         res.status(403).json({ message: 'not have name or password' })
    //         return
    //     }
    //     try {
    //         const userData = await user.findOne({ username }).select('+password')
    //         //username wrong
    //         if (!userData) res.status(403).json({ message: 'username not Exist' })
    //         // usernam correct
    //         if (userData) {
    //             const objData = mongooseToObject.itemToObject(userData)
    //             // console.log(password,objData.password)
    //             const isCorrectPassword = await bcrypt.compare(password, objData.password)
    //             //password wrong 
    //             if (!isCorrectPassword) res.status(403).json({ message: 'pass wrong' })
    //             //password correct
    //             if (isCorrectPassword) {
    //                 //clone obj delete password
    //                 const newUserData = { ...objData }
    //                 delete newUserData.password

    //                 const accessToken = generateAccessToken(newUserData)
    //                 const refreshToken = generateRefreshToken(newUserData)
    //                 // res.
    //                 res.status(200).json({ data: newUserData, accessToken, refreshToken })
    //             }
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         res.json({ message: 'some thing wrong' })

    //     }
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