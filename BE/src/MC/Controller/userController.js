import cloudinary from "../../cloudinary/cloudinary.js"
import listDefalult from "../../constan/listDefault.js"
import method from "../../constan/method.js"
import users from "../Model/users.js"
import Mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { io } from "../../../index.js"
import manageUserRealtime from "../../constan/manageUserRealtime.js"
import notifyController from "./notifyController.js"
const { getSocketId } = manageUserRealtime
const { ObjectId } = Mongoose.Types
class userController {
    async updateUserInfor(req, res) {
        if (!req.body) return res.status(403).json({ message: 'data is emty' })
        try {
            await users.updateOne({ _id: req.user._id, }, {
                displayName: req.body.displayName,
                about: req.body.about,
            })
            res.status(200).json({ displayName: req.body.displayName, about: req.body.about })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })

        }
    }
    async changePassword(req, res) {
        try {
            const userData = await users.findOne({ _id: req.user._id }).select('+password')
            const isCorrectPassword = await bcrypt.compare(req.body.oldPassword, userData.password)
            if (!isCorrectPassword) return res.status(403).json({ message: 'wrong password' })
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.newPassword, salt);
            await users.updateOne({ _id: req.user._id }, { password: hashed })
            res.status(200).json({ message: 'Đổi mật khẩu thành công' })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async updateAvt(req, res) {
        const file = req.file
        if (!file) return res.status(403).json({ message: 'file is emty' })
        try {
            const user = req.user
            if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
            const resultClould = await cloudinary.uploader.upload(file.path, {
                resource_type: 'image',
                folder: 'FacebookCollection/avatarCollection',
                transformation: [
                    { width: 600, height: 600, crop: 'fill' }
                ]
            })
            await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
            res.status(200).json({ avatarUrl: resultClould.url })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }
    }
    // async updateCoverAvt(req, res) {
    //     const file = req.file
    //     if (!file) return res.status(403).json({ message: 'file is emty' })
    //     try {
    //         const user = req.user
    //         if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
    //         const resultClould = await cloudinary.uploader.upload(file.path, { resource_type: 'image', folder: 'FacebookCollection/coverCollection' })
    //         await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
    //         res.status(200).json({ avatarUrl: resultClould.url })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(403).json({ message: ' something wrong' })
    //     }
    // }

    async updateCoverAvt(req, res) {
        const file = req.file
        if (!file) return res.status(403).json({ message: 'file is emty' })
        try {
            // const user = req.user
            // if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
            const resultClould = await cloudinary.uploader.upload(file.path, {
                resource_type: 'image',
                folder: 'FacebookCollection/coverCollection',
                transformation: [
                    { width: 800, height: 400, crop: 'fill' }
                ]
            })
            await users.updateOne({ _id: req.user._id }, { coverAvatar: resultClould.url })
            res.status(200).json({ coverAvatar: resultClould.url })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }
    }
    async getUserAll(req, res) {
        try {
            const user = await users.find({ _id: { $nin: [...req.user.friend, req.user._id, ...req.user.friendRequest, ...req.user.myRequestFriends] } }).sort({ createdAt: -1 }).populate({ path: 'friendRequest', select: 'avatarUrl displayName' }).limit(9).select('avatarUrl displayName')
            res.json(user)
        } catch (error) {

        }
    }
    async getUserById(req, res) {
        const { userId } = req.params
        try {
            const user = await users.findById({ _id: userId })
                .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                .populate({ path: 'friend', select: 'avatarUrl displayName' })
            if (!user) return res.status(500).json({ message: 'user not found' })
            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error)
        }
    }
    async handleFriend(req, res) {
        const { friendId, action } = req.body
        const friend = req.friend
        const requestId = req.user._id
        const updateType = ['friend', 'friendRequest', 'myRequestFriends']
        const listPromises = []
        try {
            if (action == 'request') {
                if (friend.friendRequest.includes(requestId)) return res.status(400).json({ message: 'request is Exist' })
                if (friend.friend.includes(requestId)) return res.status(400).json({ message: 'have made friends' })
                if (req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'Please accept friend' })

                listPromises[0] = users.findByIdAndUpdate({ _id: requestId, }, { $addToSet: { myRequestFriends: ObjectId(friendId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
                listPromises[1] = users.findByIdAndUpdate({ _id: friendId, }, { $addToSet: { friendRequest: ObjectId(requestId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
                const newNotify = notifyController.createNotify(req, 'addFriend')
                listPromises[2] = newNotify
            }
            if (action == 'accept') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'not friend request' })

                listPromises[0] = users.findByIdAndUpdate({ _id: requestId }, {
                    $pull: { friendRequest: ObjectId(friendId), },
                    $addToSet: { friend: ObjectId(friendId) }
                }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })

                listPromises[1] = users.findByIdAndUpdate({ _id: friendId }, {
                    $addToSet: { friend: ObjectId(requestId,) },
                    $pull: { myRequestFriends: ObjectId(requestId) }

                }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
                const newNotify = notifyController.createNotify(req, 'acceptFriend')
                listPromises[2] = newNotify
            }
            if (action == 'reject') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'friendRequest it no longer exists' })

                listPromises[0] = users.findByIdAndUpdate({ _id: requestId }, { $pull: { friendRequest: ObjectId(friendId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })

                listPromises[1] = users.findByIdAndUpdate({ _id: friendId }, {
                    $pull: { myRequestFriends: ObjectId(requestId) }
                }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
            }

            if (action == 'remove') {
                console.log(req.user.friend, friendId)
                if (!req.user.friend.includes(friendId)) return res.status(400).json({ message: 'friend it no longer exists' })

                listPromises[0] = users.findByIdAndUpdate({ _id: requestId }, { $pull: { friend: ObjectId(friendId) }, }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
                listPromises[1] = users.findByIdAndUpdate({ _id: friendId }, { $pull: { friend: ObjectId(requestId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
            }
            if (action == 'cancel') {
                if (!req.user.myRequestFriends.includes(friendId)) return res.status(400).json({ message: 'friend it no longer exists' })
                listPromises[0] = users.findByIdAndUpdate({ _id: requestId }, { $pull: { myRequestFriends: ObjectId(friendId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
                    .populate({ path: 'myRequestFriends', select: 'avatarUrl displayName' })

                listPromises[1] = users.findByIdAndUpdate({ _id: friendId }, { $pull: { friendRequest: ObjectId(requestId) } }, { new: true })
                    .populate({ path: 'friendRequest', select: 'avatarUrl displayName' })
                    .populate({ path: 'friend', select: 'avatarUrl displayName' })
            }
            const listResults = await Promise.all(listPromises)
            const [userNewest, friendNew] = listResults
            io.to(getSocketId(userNewest._id)).emit('update-user', { type: updateType, userInfor: userNewest })
            io.to(getSocketId(friendNew._id)).emit('update-user', { type: updateType, userInfor: friendNew })
            return res.status(200).json({ message: 'success' })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'something wrong' })
        }
    }
    async suggestionsUser(req, res) {
        // try {
        //     const newArr = [...req.user.following, req.user._id]

        //     const num = req.query.num || 10

        //     const users = await Users.aggregate([
        //         { $match: { _id: { $nin: newArr } } },
        //         { $sample: { size: Number(num) } },
        //         { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        //         { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
        //     ]).project("password")

        //     return res.json({
        //         users,
        //         result: users.length
        //     })

        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }

        try {

        } catch (error) {

        }
    }
    updateSelfIntroduce(req, res) {

    }
    logout(req, res) {
        const socketId = getSocketId(req.user._id.toString())
        const disconnectedSocket = io.sockets.sockets.get(socketId)
        if (disconnectedSocket) {
            disconnectedSocket.disconnect();
        }
        res.clearCookie('refreshToken', { sameSite: 'none', secure: true }).json('sss')
    }
    async suggestionsUserAutocomplete(req, res) {
        let q = req.query.suggest ? req.query.suggest : '';
        if (!q) return res.status(200).json([])
        let query = {
            "displayName": { "$regex": q, "$options": "i" },

        };

        try {
            const user = await users.find(query).limit(6)
            const displayNameSuggestions = user.map(item => item.displayName)
            const setSuggest = new Set(displayNameSuggestions)
            res.status(200).json([...setSuggest])
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }

    async searchUser(req, res) {
        let q = req.query.q ? req.query.q : '';
        if (!q) return res.status(200).json([])
        let query = {
            "displayName": { "$regex": q, "$options": "i" },
            _id: { $ne: req.user._id }

        };

        try {
            const user = await users.find(query)
            res.status(200).json([...user])
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
}

export default new userController()