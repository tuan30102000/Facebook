import manageUserRealtime from "../../constan/manageUserRealtime.js";
import chat from "./chat.js";
import commentPost from "./commentPost.js";
const { push, remove, get, getSocketId } = manageUserRealtime
class socketService {
    connection(socket) {
        push(socket.user._id, socket.id)
        socket.on('disconnect', () => {
            remove(socket.user._id)
        })
        commentPost(socket)
        chat(socket)
    }
}

export default new socketService()