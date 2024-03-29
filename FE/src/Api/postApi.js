import axiosClient from "./axiosClient";
import axiosJwt from "./axiosJwt";
const postApi = {
    createPost(data) {
        const formData = new FormData()
        formData.content || formData.append('content', data.content)
        formData.privateType || formData.append('privateType', data.privateType)
        data.photo.forEach(item => {
            formData.append('image', item)
        });
        return axiosJwt.post('/post/create', formData, { headers: { 'content-Type': 'multipart/form-data' } })
    },
    deletePost(postId) {
        return axiosJwt.delete('/post/delete/' + postId)
    },
    updatePost(postId, data) {
        const formData = new FormData()
        formData.content || formData.append('content', data.content)
        formData.photos || formData.append('photos', data.photos)
        formData.privateType || formData.append('privateType', data.privateType)
        data.imgFile.forEach(item => {
            formData.append('image', item)
        });
        return axiosJwt.patch('/post/update/' + postId, formData, { headers: { 'content-Type': 'multipart/form-data' } })
    },
    handleNotify(hasNotify, postId) {
        const url = `post/notify/${hasNotify ? 'pull' : 'add'}/${postId}`
        return axiosJwt.patch(url)
    },
    getPost(postId) {
        console.log(postId)
        return axiosJwt.get('/post/get/' + postId)
    },
    getAllPost() {
        return axiosJwt.get('/post/getall')
    },
    getPostUser(userId) {
        const url = 'post/getpostuser/' + userId
        return axiosJwt.get(url)
    },
    reactPost(action, postId) {
        const url = 'post/react/' + postId
        return axiosJwt.patch(url, { action })

    },
    createComment(postId, comment) {
        const url = `post/${postId}/comment/create`
        return axiosJwt.post(url, { comment })
    },
    getCommentInPost(postId) {
        const url = `post/${postId}/comment`
        return axiosJwt.get(url)
    },
    removeComment(postId, commentId) {
        const url = `post/${postId}/comment/delete/${commentId}`
        return axiosJwt.delete(url)
    },
    editComment(postId, commentId, comment = '') {
        const url = `post/${postId}/comment/edit/${commentId}`
        return axiosJwt.patch(url, { comment: comment })
    }
}

export default postApi