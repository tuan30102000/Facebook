import { Router } from "express";
import commentController from "../MC/Controller/commentController.js";
import middlewareController from "../MC/Controller/middlewareController.js";
import postController from "../MC/Controller/postController.js";
import upload from "../multer/multer.js";
const postRouter = Router()
postRouter.post('/create', upload.any(), middlewareController.verifyToken, postController.createPost)
postRouter.patch('/update/:postId', upload.any(), middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, postController.updatePost)
postRouter.patch('/react/:postId', middlewareController.verifyToken, middlewareController.verifyPost, postController.reactPost)
postRouter.patch('/notify/add/:postId', middlewareController.verifyToken, middlewareController.verifyPost, postController.addNotify)
postRouter.patch('/notify/pull/:postId', middlewareController.verifyToken, middlewareController.verifyPost, postController.removeNotify)
// postRouter.patch('/private/:postId', middlewareController.verifyToken, middlewareController.verifyPost,middlewareController.isOwmerPost, postController.reactPost)
postRouter.delete('/delete/:postId', middlewareController.verifyToken, middlewareController.verifyPost, postController.removePost)
postRouter.get('/get/:postId', middlewareController.verifyToken, postController.getPost)
postRouter.get('/getpostuser/:userId', middlewareController.verifyToken, postController.getPostUser)
postRouter.get('/getall', middlewareController.verifyToken, postController.getAllPost)

postRouter.post('/:postId/comment/create', middlewareController.verifyToken, middlewareController.verifyPost, commentController.createComment)
postRouter.get('/:postId/comment', middlewareController.verifyToken, middlewareController.verifyPost, commentController.getCommentInPost)
postRouter.delete('/:postId/comment/delete/:commentId', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.verifyComment, middlewareController.verifyRoleDeleteComment, commentController.removeComment,)
postRouter.patch('/:postId/comment/edit/:commentId', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.verifyComment, middlewareController.verifyRoleEditComment, commentController.editComment)
// postRouter.delete('/:postId/comment/deleteall', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, )


export default postRouter