import axiosJwt from "./axiosJwt"
import queryString from 'query-string'

const chatApi = {
    checkConversation(memberId) {
        const url = 'conversation/check/' + memberId
        return axiosJwt.get(url)
    },
    getConversations(paginationData = { page: 1, limit: 5 }) {
        const url = 'conversation/get?' + queryString.stringify(paginationData)
        return axiosJwt.get(url)
    },
    async createConversationAndMessage(memberId, message) {
        const conversation = await axiosJwt.post('conversation/create', { memberId })
        const newMessage = await this.createMessage(message, conversation._id)
        return { conversation, newMessage }
    },
    createMessage(message, conversationId) {
        const url = 'message/create/' + conversationId
        return axiosJwt.post(url, { message })
    },
    getMessage(conversationId, paginationData = { page: 1, limit: 15 }) {
        const url = 'message/get/' + conversationId + '?' + queryString.stringify(paginationData)
        return axiosJwt.get(url)
    },
    seenConversation(conversationId) {
        const url = 'conversation/seen/' + conversationId
        return axiosJwt.post(url)
    }
}

export default chatApi