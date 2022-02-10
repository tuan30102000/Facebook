import JWT from "jsonwebtoken"
import user from "../Model/users.js"
import bcrypt from 'bcrypt'
import mongooseToObject from "../until/mogooseToObj.js"
class authController {
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
                    const JWTData = JWT
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
    async login(req, res) {
        // res.send('21212')
        const { username, password, } = req.body
        if (username && password) {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const userData =await user.findOne({ username })
                if (userData) {
                    const objData=mongooseToObject.itemToObject(userData)
                    const newUserData = { ...objData }
                    delete newUserData.password
                    const JWTData = await JWT.sign({ id: newUserData._id }, 'tuan')
                    res.json({newUserData,JWTData})
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default new authController()