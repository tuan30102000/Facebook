import axiosJwt from "./axiosJwt"

const userAuth = {
    editAvatar(file) {
        const url = 'user/avatar'
        const form = new FormData()
        form.append('avatar', file)
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
   
}
export default userAuth
