import axiosJwt from "./axiosJwt"

const chatApi = {
    checkConversation(memberId) {
        const url = 'conversation/check/' + memberId
        return axiosJwt.get(url)
    },
    getConversations() {
        const url = 'conversation/get'
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
    getMessage(conversationId) {
        const url = 'message/get/' + conversationId
        return axiosJwt.get(url)
    }
}

export default chatApi