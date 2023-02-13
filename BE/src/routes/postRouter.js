import { Router } from "express";
import commentController from "../MC/Controller/commentController.js";
import middlewareController from "../MC/Controller/middlewareController.js";
import postController from "../MC/Controller/postController.js";
import upload from "../multer/multer.js";
const postRouter = Router()
postRouter.post('/create', upload.any(), middlewareController.verifyToken, postController.createPost)
postRouter.patch('/update/:postId', upload.any(), middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, postController.updatePost)
postRouter.patch('/react/:postId', middlewareController.verifyToken, middlewareController.verifyPost, postController.reactPost)
postRouter.delete('/delete/:postId', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, postController.deletePost)
postRouter.get('/get/:postId', postController.getPost)
postRouter.get('/getpostuser/:userId', postController.getPostUser)
postRouter.get('/getall', postController.getAllPost)

postRouter.post('/:postId/comment/create', middlewareController.verifyToken, middlewareController.verifyPost, commentController.createComment)
postRouter.get('/:postId/comment', middlewareController.verifyToken, middlewareController.verifyPost, commentController.getCommentInPost)
postRouter.delete('/:postId/comment/delete/:commentId', middlewareController.verifyToken, middlewareController.verifyPost,middlewareController.verifyComment, middlewareController.verifyRoleDeleteComment, commentController.removeComment,)
// postRouter.delete('/:postId/comment/deleteall', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, )
// postRouter.path('/:postId/comment/edit/:commentId', middlewareController.verifyToken, middlewareController.verifyPost, middlewareController.isOwmerPost, )


export default postRouter