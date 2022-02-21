import JWT from "jsonwebtoken"
import user from "../Model/users.js"
import bcrypt from 'bcrypt'
import mongooseToObject from "../until/mogooseToObj.js"
function generateAccessToken(data = {}, time = '1m') {
    return JWT.sign({ data }, process.env.SECRET_ACCESS_KEY, { expiresIn: time })
}
function generateRefreshToken(data = {}, time = '365d') {
    return JWT.sign({ data }, process.env.SECRET_REFRESH_KEY, { expiresIn: time })
}
class authController {
    constructor() {

    }
    async register(req, res) {

        const { username, password, email } = req.body
        if (username && password && password.length > 7) {
            try {
                const checkDataName = await user.findOne({ username })
                const checkDataEmail = await user.findOne({ email })
                const isUserExist = checkDataName || checkDataEmail
                if (!isUserExist) {
                    //hash pass
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(password, salt);
                    // save user
                    const newUser = await new user({
                        username, email, password: hashed
                    })
                    const useAfterCreate = newUser.save()
                    res.json(useAfterCreate)
                } else res.status(403).json({ message: checkDataName ? 'username is exit' : 'email is Exist' })
            } catch (error) {
                console.log('error', error)
            }
        } else {
            if (!username && !password) {
                res.send('name or password is not Exist')
            } else res.send('password length is not enough')
        }

    }
    async refreshToken(req, res) {
        const refeshToken = req.cookies?.refreshToken
        console.log(req.cookies)
        //not Exist rft
        if (!refeshToken) return res.status(401).json({ message: 'You\'re not authenticated', })
        const user = await JWT.verify(refeshToken, SECRET_REFRESH_KEY)
        if (!user) return res.json({ message: 'token not valid' })

        const newRefreshToken = generateRefreshToken(user)
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "none",
        });
        res.status(200)
    }
    async login(req, res) {
        const { username, password, } = req.body
        if (!(username && password)) {
            console.log(req.body)
            res.json({ message: 'not have name or password' })
            return
        }
        try {
            const userData = await user.findOne({ username }).select('+password')
            //username wrong
            if (!userData) res.json({ message: 'username not Exist' })
            // usernam correct
            if (userData) {
                const objData = mongooseToObject.itemToObject(userData)
                // console.log(password,objData.password)
                const isCorrectPassword = await bcrypt.compare(password, objData.password)
                //password wrong 
                if (!isCorrectPassword) res.send('password wrong')
                //password correct
                if (isCorrectPassword) {
                    //clone obj delete password
                    const newUserData = { ...objData }
                    delete newUserData.password

                    const accessToken = generateAccessToken(newUserData)
                    const refreshToken = generateRefreshToken(newUserData)
                    // res.
                    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "none",
                        domain: 'http://localhost:3000/',
                    }).status(200).json({ data: newUserData, accessToken, refreshToken })
                }
            }

        } catch (error) {
            console.log(error)
            res.json({ message: 'some thing wrong' })

        }

    }
    async logout(req, res) {
        res.cookie.clear('refeshToken')
    }
}

export default new authController()