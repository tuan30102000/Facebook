import io from 'socket.io-client';
import ApiUrl from './ApiUrl';
import method from './method';
const socket = function () {
    return io(ApiUrl.baseURL, {
        withCredentials: false,
        extraHeaders: {
            accesstoken: method.getAccessToken()
        }
    })
}

export default socket