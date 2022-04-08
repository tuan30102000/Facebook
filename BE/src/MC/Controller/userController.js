import cloudinary from "../../cloudinary/cloudinary.js"
import listDefalult from "../../constan/listDefault.js"
import method from "../../constan/method.js"
import users from "../Model/users.js"
class userController {
    async updateUserInfor(req, res) {
        if (!req.body) return res.status(403).json({ message: 'displayName is emty' })
        try {
            await users.updateOne({ _id: req.user._id, }, {
                displayName: req.body.displayName,
                about: req.body.about,
            })
            res.status(200).json({ message: 'updateDisplayname complete' })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })

        }
    }

    async updateAvt(req, res) {
        const file = req.file
        if (!file) return res.status(403).json({ message: 'displayName is emty' })
        console.log(req.user)
        try {
            const user = await users.findById(req.user._id)
            if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
            const resultClould = await cloudinary.uploader.upload(file.path, { resource_type: 'image', folder: 'FacebookCollection/avatarCollection' })
            await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
            res.status(200).json({ avatarUrl: resultClould.url })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }

    }

    async friendRequest(req, res) {
        const requestId = req.user._id
        const friendId = req.params.friendId
        try {

        } catch (error) {

        }
    }
}

export default new userController()