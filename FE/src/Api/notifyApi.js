import axiosJwt from "./axiosJwt"
import queryString from 'query-string'

const notifyApi = {
    getNotify(paginationData = { page: 1, limit: 7 }) {
        const url = 'notify/' + '?' + queryString.stringify(paginationData)
        return axiosJwt.get(url)
    },
    readNotify(notifyId = 'all') {
        const url = 'notify/' + notifyId
        return axiosJwt.patch(url)
    },
}

export default notifyApi