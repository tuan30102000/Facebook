import axiosClient from "./axiosClient"
import axiosJwt from "./axiosJwt"
import queryString from 'query-string'
const userAuth = {
    editAvatar(file) {
        const url = 'user/avatar'
        const form = new FormData()
        form.append('avatar', file)
        return axiosJwt.patch(url, form, { headers: { 'content-Type': 'multipart/form-data' } })
    },
    editCoverAvatar(file) {
        const url = 'user/coverAvatar'
        const form = new FormData()
        form.append('coverAvatar', file)
        return axiosJwt.patch(url, form, { headers: { 'content-Type': 'multipart/form-data' } })
    },
    editInfor(data) {
        const url = 'user/infor'
        return axiosJwt.patch(url, data)
    },
    getAllUser() {
        const url = 'user/getall'
        return axiosJwt.get(url)
    },
    addFriend(friendId) {
        const url = 'user/friend/'
        const action = 'request'
        return axiosJwt.patch(url, { friendId, action })
    },
    rejectFriend(friendId) {
        const url = 'user/friend/'
        const action = 'reject'
        return axiosJwt.patch(url, { friendId, action })
    },
    acceptFriend(friendId) {
        const url = 'user/friend/'
        const action = 'accept'
        return axiosJwt.patch(url, { friendId, action })
    },
    removeFriend(friendId) {
        const url = 'user/friend/'
        const action = 'remove'
        return axiosJwt.patch(url, { friendId, action })
    },
    cancelRequest(friendId) {
        const url = 'user/friend/'
        const action = 'cancel'
        return axiosJwt.patch(url, { friendId, action })
    },
    getUserById(userId) {
        const url = 'user/get/' + userId
        return axiosClient.get(url)
    },
    searchSuggest(suggest) {
        const url = 'user/suggest?' + queryString.stringify({ suggest })
        return axiosJwt.get(url)
    },
    search(query) {
        const url = 'user/search' + query
        return axiosJwt.get(url)
    },
    logout() {
        const url = 'user/logout'
        return axiosJwt.post(url)
    }
}
export default userAuth
