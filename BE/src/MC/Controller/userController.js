import cloudinary from "../../cloudinary/cloudinary.js"
import listDefalult from "../../constan/listDefault.js"
import method from "../../constan/method.js"
import users from "../Model/users.js"
import Mongoose from "mongoose"
const { ObjectId } = Mongoose.Types
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
    async getUserAll(req, res) {
        try {
            const user = await users.find({ _id: { $ne: req.user._id } }).populate({ path: 'friendRequest', select: 'avatarUrl displayName' }).select('avatarUrl displayName')
            res.json(user)
        } catch (error) {

        }
    }
    async getUserById(req, res) {
        const { userId } = req.params
        try {
            const user = await users.findById({ _id: userId }).populate({ path: 'friend', select: 'avatarUrl displayName' })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json('user not found')
        }
    }
    async handleFriend(req, res) {
        const { friendId, action } = req.body
        const friend = req.friend
        const requestId = req.user._id
        try {
            if (action == 'request') {
                if (friend.friendRequest.includes(requestId)) return res.status(400).json({ message: 'request is Exist' })
                if (friend.friend.includes(requestId)) return res.status(400).json({ message: 'have made friends' })
                if (req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'Please accept friend' })
                await users.updateOne({ _id: friendId, }, { $addToSet: { friendRequest: ObjectId(requestId) } })
                return res.status(200).json({ message: 'add req thanh cong' })
            }

            if (action == 'accept') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'not friend request' })
                await users.updateOne({ _id: requestId }, {
                    $pull: { friendRequest: ObjectId(friendId), },
                    $addToSet: { friend: ObjectId(friendId) }
                })
                await users.updateOne({ _id: friendId }, { $addToSet: { friend: ObjectId(requestId) } })
                return res.status(200).json({ message: 'accept successfully' })
            }

            if (action == 'reject') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'friendRequest it no longer exists' })
                await users.updateOne({ _id: requestId }, { $pull: { friendRequest: ObjectId(friendId) } })
                return res.status(200).json({ message: 'rejectFriend successfully' })
            }

            if (action == 'remove') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'friend it no longer exists' })
                await users.updateOne({ _id: requestId }, { $pull: { friend: ObjectId(friendId) } })
                await users.updateOne({ _id: friendId }, { $pull: { friend: ObjectId(requestId) } })
                return res.status(200).json({ message: 'removeFriend successfully' })
            }
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'something wrong' })
        }
    }

}

export default new userController()