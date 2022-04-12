import cloudinary from "../../cloudinary/cloudinary.js"
import method from "../../constan/method.js"
import post from "../Model/post.js"
class postController {
    async createPost(req, res) {
        const fileList = req.files
        const { content } = req.body
        if (!(content || fileList[0])) return res.status(403).json({ message: 'content emty', })
        if (fileList.length > 3) return res.status(403).json({ message: '3 files limit' })
        // if(req.files.length>3) return res.status(403).json({message:'3 files limit'})
        const pathFileList = fileList[0] ? fileList.map(item => cloudinary.uploader.upload(item.path, { resource_type: 'image', folder: 'FacebookCollection/postCollections' })) : []
        try {
            const resultClould = await Promise.all(pathFileList)
            console.log(resultClould)
            const listUrl = resultClould.map(item => item.url)
            const newPost = new post({
                owner: req.user._id,
                content,
                imgUrl: listUrl
            })
            const newPostAfter = await newPost.save()
            // const result = await cloudinary.uploader.unsigned_upload(pathFileList, { resource_type: 'image', public_id: 'FacebookCollection/postCollection' })
            // console.log(result)
            res.status(200).json({ ...req.user, ...newPostAfter._doc })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async deletePost(req, res) {
        try {
            const listUrlPost = req.postCurrent.imgUrl
            const listPublicId = listUrlPost.imgUrl.map(item => method.getClouldDinary(item))
            const listPromiseDetroyImgClouldDinary = listPublicId.map(item => cloudinary.uploader.destroy(item))
            await Promise.all(listPromiseDetroyImgClouldDinary)
            await post.deleteOne({ _id: req.params.postId })
            res.status(201).json({ message: 'delete successfully' })
        } catch (error) {
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async updatePost(req, res) {
        let { content, photos } = req.body
        photos = photos ? photos.split(',') : []
        const listUrlPost = req.postCurrent.imgUrl
        const listDetroyUrl = listUrlPost.filter(item => !photos.includes(item))
        const listPromiseDetroyImgClouldDinary = listDetroyUrl.map(item => cloudinary.uploader.destroy(method.getClouldDinary(item)))
        try {
            //nothasnewFile
            await Promise.all(listPromiseDetroyImgClouldDinary)
            if (!req.files[0]) {
                await post.updateOne({ _id: req.params.postId }, { imgUrl: photos, content })
                const postAfterEdit = await post.findById(req.params.postId).populate({ path: 'owner', select: 'displayName avatarUrl' })
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
            const postAfterEdit = await post.findById(req.params.postId).populate({ path: 'owner', select: 'displayName avatarUrl' })
            return res.status(200).json({ ...postAfterEdit._doc })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async getPost(req, res) {
        try {
            const postData = await post.findById(req.params.postId).populate({ path: 'owner', select: 'displayName avatarUrl' })
            res.status(200).json(postData)
        } catch (error) {
            res.status(403).json({ message: 'something wrong' })
        }
    }
    async getAllPost(req, res) {
        try {
            const allPost = await post.find({}).populate({ path: 'owner', select: 'displayName avatarUrl' }).exec()
            res.status(200).json(allPost)
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }

    }
    async getPostUser(req, res) {
        try {
            const postOfUser = await post.find({ owner: req.params.userId }).populate({ path: 'owner', select: 'displayName avatarUrl' })
            res.status(200).json(postOfUser)
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: 'something wrong' })
        }
    }
}

export default new postController()

