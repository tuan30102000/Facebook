export default (function () {
    const socketMap = new Map()
    function get() {
        return socketMap
    }
    function getSocketId(userId) {
        return socketMap.get(userId)
    }
    function push(userId, socketId) {
        socketMap.set(userId, socketId)
    }
    function remove(userId) {
        socketMap.delete(userId)
    }
    function getMany(items = []) {
        if (!items[0]._id) return items.map(item => socketMap.get(item.toString()))
        return items.map(item => socketMap.get(item._id.toString()))
    }

    return { push, remove, get, getSocketId, getMany }
})()