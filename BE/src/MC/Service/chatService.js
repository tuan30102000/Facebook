class chatSevice {
    connection(socket) {
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })
        socket.on('join-post', (postId) => {
            socket.join(postId)
        })
        socket.on('leave-post', (postId) => {
            socket.leave(postId)
            // console.log('leave')
        })

        // event on here

        // socket.on('chat message', msg => {
        //     console.log(`msg is:::${msg}`)
        //     _io.emit('chat message', msg)
        // })
    }
}

export default new chatSevice()