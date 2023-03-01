export default function (socket) {
    socket.on('join-conversation', (conversationId) => {
        socket.join(conversationId)
    })
    socket.on('leave-conversation', (conversationId) => {
        socket.leave(conversationId)
        // console.log('leave')
    })
}