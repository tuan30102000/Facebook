export default {
    user: {
        current: {},
        login: false,
        loginPending: false,
        loginError: false,
        setting: {},
        socket: null,
        isFirstLoad: false
    }, chat: {
        conversations: [],
        currentChat: [],
        isLoadConversations: true,
    }, notify: {
        notifies: [],
        isLoadNotify: true,
        nextPage: 1,
        cusor: null,
    }
}