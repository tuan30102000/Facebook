import { io } from "../../../index.js"
import listDefalult from "../../constan/listDefault.js"
import notifys from "../Model/notifys.js"
import manageUserRealtime from "../../constan/manageUserRealtime.js";
import pagination from "../until/pagination.js"
const { push, remove, get, getSocketId, getMany } = manageUserRealtime
const populateData = { path: 'user', select: 'avatarUrl displayName' }

class notifyController {

    async createNotify(req, type, action) {
        try {
            let notify
            const name = req.user.displayName
            if (type == 'post') {
                let receiver = req.postCurrent.sendNotify.filter(item => item.toString() != req.user._id.toString())

                if (req.postCurrent.privateType == listDefalult.typePrivate[1]) {
                    receiver = receiver.reduce((accumulator, currentValue) => {
                        if (req.postCurrent.owner.friend.includes(currentValue)) {
                            accumulator.push(currentValue);
                        }
                        return accumulator;
                    }, []);
                }

                if (req.postCurrent.privateType == listDefalult.typePrivate[2]) receiver = []
                if (!receiver[0]) return
                notify = new notifys({
                    type, receiver, message: `đã ${action} bài viết`, id: req.postCurrent._id, user: req.user._id
                })
            }
            if (type == 'addFriend') {
                const receiver = [req.friend._id]
                notify = new notifys({
                    type, receiver, message: `đã gửi yêu cầu kết bạn`, id: req.user._id, user: req.user._id
                })

            }
            if (type == 'acceptFriend') {
                const receiver = [req.friend._id]
                notify = new notifys({
                    type, receiver, message: `đã chấp nhận yêu cầu kết bạn`, id: req.user._id, user: req.user._id
                })
            }
            await notify.save()
            notify._doc.user = {
                _id: req.user._id,
                displayName: name,
                avatarUrl: req.user.avatarUrl
            }
            io.to(getMany(notify._doc.receiver)).emit('new-notify', notify._doc)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }
    // seen: { $nin: ['a']
    async getNotifyNotRead(req, res) {
        const cursor = req.query.cursor || Number(Date.now())

        try {
            const paginations = await pagination(
                () => notifys
                    .find(
                        {
                            receiver: { $all: [req.user._id] },
                            createTime: { $lt: cursor },
                            // reads: { $ne: [req.user._id] }
                        })
                    .sort({ createTime: -1 })
                    .populate(populateData), req.query)
            res.status(200).json(paginations)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    async readNotify(req, res) {
        try {
           await notifys
                .updateOne(
                    { _id: req.params.notifyId, receiver: { $all: [req.user._id] } },
                    { $addToSet: { reads: req.user._id } }
                )
            res.status(200).json({ _id: req.params.notifyId })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    async readAllNotify() {
        try {
            const notifys = notifys
                .updateMany(
                    { receiver: { $all: [req.user._id] } },
                    { $addToSet: { reads: req.user._id } }
                )
            res.status(200).json(notifys)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

}



export default new notifyController()   