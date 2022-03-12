import method from "../Constan/method";
import StorageKey from "../Constan/StorageKey";
import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },
    login(data) {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },
    async refresh() {
        const url = '/auth/refresh'
        const refreshToken = method.getRefreshToken()
        return axiosClient.post(url, { refreshToken },)
    },
}

export default userApi 