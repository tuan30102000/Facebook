class chatSevice {
    connection(socket) {
        console.log('cnt')
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })
        socket.on('join-convention', (conventionId) => {
            socket.join(conventionId)
        })
        socket.on('leave-convention', (conventionId) => {
            socket.leave(conventionId)
            console.log('leave')
        })

        // event on here

        // socket.on('chat message', msg => {
        //     console.log(`msg is:::${msg}`)
        //     _io.emit('chat message', msg)
        // })
    }
}

export default new chatSevice()