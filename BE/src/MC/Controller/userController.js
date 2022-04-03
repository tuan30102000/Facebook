import cloudinary from "../../cloudinary/cloudinary"
import users from "../Model/users"

class userController {
    async updateUserInfor(req, res) {
        if (!req.body) return res.status(403).json({ message: 'displayName is emty' })
        try {
            await users.updateOne({ _id: req.user._id, }, {
                ...req.body
            })
            res.status(200).json({ message: 'updateDisplayname complete' })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })

        }
    }

    async updateAvt(req, res) {
        const file = req.body.files
        if (!file[0]) return res.status(403).json({ message: 'displayName is emty' })
        if (file.length > 1) return res.status(403).json({ message: 'displayName is emty' })
        try {
            const resultClould = await cloudinary.uploader.upload(file[0].path, { resource_type: 'image', folder: 'FacebookCollection/avatarCollection' })
            await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
            res.status(200).json({ message: 'updateDisplayname complete' })

        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }

    }

    async friendRequest(req, res) {
        const requestId = req.user._id
        const friendId=req.params.friendId
        try {
            
        } catch (error) {
            
        }
    }
}

export default new userController()