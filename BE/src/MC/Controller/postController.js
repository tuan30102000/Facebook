import cloudinary from "../../cloudinary/cloudinary.js"
import method from "../../constan/method.js"
import post from "../Model/posts.js"
import Mongoose from "mongoose"
import listDefalult from "../../constan/listDefault.js"
import notifyController from "./notifyController.js"
const { ObjectId } = Mongoose.Types
const populateData = { path: 'owner', select: 'displayName avatarUrl' }
const createQueryPostOBj = (req) => {
    return {
        active: true,
        $or: [
            {
                owner: req.user._id
            },
            {
                privateType: listDefalult.typePrivate[1],
                owner: { $in: req.user.friend }
            },
            {
                privateType: listDefalult.typePrivate[0]
            }
        ]
    }
}
const createQueryPostForUserOBj = (req) => {
    // if (req.user._id.toString() == req.postCurrent.owner.toString()) return { _id: userId }
    return {
        active: true,
        owner: req.params.userId,
        $or: [
            {
                owner: req.user._id
            },
            {
                privateType: listDefalult.typePrivate[1],
                owner: { $in: req.user.friend }
            },
            {
                privateType: listDefalult.typePrivate[0]
            }

        ]
    }
}
const createQueryPostDetailPost = (req) => {
    // if (req.user._id.toString() == req.postCurrent.owner.toString()) return { _id: userId }
    return {
        active: true,
        _id: req.params.postId,
        $or: [
            {
                owner: req.user._id
            },
            {
                privateType: listDefalult.typePrivate[1],
                owner: { $in: req.user.friend }
            },
            {
                privateType: listDefalult.typePrivate[0]
            }

        ]
    }
}
class postController {
    async createPost(req, res) {
        const fileList = req.files
        const { content, privateType } = req.body
        if (!(content || fileList[0])) return res.status(403).json({ message: 'content emty', })
        if (fileList.length > 3) return res.status(403).json({ message: '3 files limit' })
        // if(req.files.length>3) return res.status(403).json({message:'3 files limit'})
        const pathFileList = fileList[0] ? fileList.map(item => cloudinary.uploader.upload(item.path, { resource_type: 'image', folder: 'FacebookCollection/postCollections', })) : []
        try {
            const resultClould = await Promise.all(pathFileList)
            const listUrl = resultClould.map(item => item.url)
            const newPost = new post({
                owner: req.user._id,
                content,
                imgUrl: listUrl,
                privateType,
                sendNotify: [req.user._id]
            })
            const newPostAfter = await newPost.save()
            const newPostData = await post.findById(newPostAfter._id).populate(populateData)
            res.status(200).json(newPostData)
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async deletePost(req, res) {
        try {
            const listUrlPost = req.postCurrent.imgUrl
            const listPublicId = listUrlPost.map(item => method.getClouldDinary(item))
            const listPromiseDetroyImgClouldDinary = listPublicId.map(item => cloudinary.uploader.destroy(item))
            await Promise.all(listPromiseDetroyImgClouldDinary)
            await post.deleteOne({ _id: req.params.postId })
            res.status(201).json({ message: 'delete successfully' })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async removePost(req, res) {
        try {
            await post.updateOne({ _id: req.params.postId, owner: req.user._id }, { active: false })
            res.status(201).json({ message: 'delete successfully' })
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }
    async updatePost(req, res) {
        let { content, photos, privateType } = req.body
        photos = photos ? photos.split(',') : []
        const listUrlPost = req.postCurrent.imgUrl
        const listDetroyUrl = listUrlPost.filter(item => !photos.includes(item))
        const listPromiseDetroyImgClouldDinary = listDetroyUrl.map(item => cloudinary.uploader.destroy(method.getClouldDinary(item)))
        try {
            //nothasnewFile
            await Promise.all(listPromiseDetroyImgClouldDinary)
            if (!req.files[0]) {
                await post.updateOne({ _id: req.params.postId }, { imgUrl: photos, content, privateType })
                const postAfterEdit = await post.findById(req.params.postId).populate(populateData)
                return res.status(200).json({ ...postAfterEdit._doc })
            }
            //hasnewFile
            //check file limit
            if (photos.length + req.files.length > 3) return res.status(403).json({ message: 'limit 3 image' })
            //get url CLoud
            const promiseClouldList = req.files.map(item => cloudinary.uploader.upload(item.path, { resource_type: 'image', folder: 'FacebookCollection/postCollections' }))
            const listCloudUrl = (await Promise.all(promiseClouldList)).map(item => item.url)
            photos = [...photos, ...listCloudUrl]
            await post.updateOne({ _id: req.params.postId }, { imgUrl: photos, content })
            const postAfterEdit = await post.findById(req.params.postId).populate(populateData)
            return res.status(200).json({ ...postAfterEdit._doc })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async getPost(req, res) {
        try {
            const postData = await post.findOne(createQueryPostDetailPost(req)).populate(populateData)

            res.status(200).json(postData)
        } catch (error) {
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async getAllPost(req, res) {
        try {
            const allPost = await post.find(createQueryPostOBj(req))
                .sort({ updatedAt: -1 })
                .populate(populateData).exec()
            res.status(200).json(allPost)
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }

    }
    async getPostUser(req, res) {
        try {
            const postOfUser = await post.find(createQueryPostForUserOBj(req)).sort({ updatedAt: -1 }).populate(populateData)
            res.status(200).json(postOfUser)
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async reactPost(req, res) {
        const { action } = req.body
        const { postId } = req.params
        const actionList = ['like', 'unlike']
        if (!actionList.includes(action)) return res.status(403).json({ message: 'action not found' })
        try {
            if (action == 'like') {
                // if (req.postCurrent.like.includes(postId)) return res.status(403).json({ message: 'you liked' })
                const updatePrm = post.updateOne({ _id: postId },
                    {
                        $addToSet: { like: ObjectId(req.user._id), },
                        $inc: {
                            score: 1,
                        }
                    })
                const newNotify = notifyController.createNotify(req, 'post', 'thích')

                const listPrm = [updatePrm, newNotify]

                await Promise.all(listPrm)
                return res.status(200).json({ message: 'like done' })
            }
            if (action == 'unlike') {
                // if (!req.postCurrent.like.includes(req.user._id)) return res.status(403).json({ message: 'you don\'t like it' })
                await post.updateOne({ _id: postId }, { $pull: { like: ObjectId(req.user._id) } })
                return res.status(200).json({ message: 'unlike done' })
            }

        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }
    async changePrivateType(req, res) {
        if (!listDefalult.typePrivate.includes(req.body.typePrivate)) return res.status(403).json({ message: 'Can set type is ' + req.body.typePrivate })
        try {
            await post.updateOne({ _id: req.postCurrent._id }, { private: req.body.typePrivate })
            res.status(200).json({ message: 'change successfully' })
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }

    }
    async addNotify(req, res) {
        try {
            await post.updateOne({ _id: req.postCurrent._id }, { $addToSet: { sendNotify: ObjectId(req.user._id) } })
            res.status(200).json({ message: 'change successfully' })
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }
    async removeNotify(req, res) {
        try {
            await post.updateOne({ _id: req.postCurrent._id }, { $pull: { sendNotify: ObjectId(req.user._id) } })
            res.status(200).json({ message: 'change successfully' })
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }
}

export default new postController()

