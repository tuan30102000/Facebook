export default function (socket) {
    socket.on('join-post', (postId) => {
        socket.join(postId)
    })
    socket.on('leave-post', (postId) => {
        socket.leave(postId)
        // console.log('leave')
    })
}