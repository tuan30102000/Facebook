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
        const url = 'user/friend/request'
        return axiosJwt.patch(url, { friendId })
    }
}
export default userAuth
