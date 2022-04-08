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
    }
}
export default userAuth
