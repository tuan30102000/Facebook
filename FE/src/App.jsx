import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import ControlPage from './Components/ControlPage';
import AuthFeature from "./Features/AuthFeature";
import LoginPage from './Features/AuthFeature/page/LoginPage';
import RegisterPage from './Features/AuthFeature/page/RegisterPage';
import { loginWithRefeshToken } from './Features/AuthFeature/userSlice';
import ChatPage from './Features/ChatFeature/ChatPage';
import { addConversation, seenConversation } from './Features/ChatFeature/chatSlice';
import HomePage from './Features/PostFeature/page/HomePage';
import SearchPage from './Features/SearchFeature/SearchPage';
import UserControl from './Features/User';
import UserPage from './Features/User/page/UserPage';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import vi from 'dayjs/locale/vi';

// Thêm plugin localizedFormat và locale vi vào dayjs
dayjs.extend(localizedFormat);
dayjs.locale(vi);
dayjs.extend(relativeTime, { abbr: true })
function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const socket = user.socket
  useLayoutEffect(() => {

    (async () => {
      const action = loginWithRefeshToken()
      dispatch(action)
    })()
    return () => {
    }
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on('new-message', conversation => {
      dispatch(addConversation(conversation))
    })
    socket.on('seen-message', cv => dispatch(seenConversation(cv)))
    return () => {
      socket.removeListener('connect_error');

    }
  }, [socket])


  return (
    <div className="app w-full min-h-screen h-max bg-[#F0F2F5] pt-[62px]">
      <Routes>
        <Route path='/auth' element={<AuthFeature />} >
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route index element={<Navigate to='login' push />} />
        </Route>
        <Route path='/search' element={<ControlPage Component={SearchPage} />} />
        <Route>
          <Route path='/profile' element={<ControlPage Component={UserControl} />} >
            <Route path=':userId' element={<UserPage />} />
            <Route index element={<Navigate to={user?.current?.data?._id} push />} />
          </Route>
          <Route path='/chat' element={<ControlPage Component={UserControl} />} >
            <Route path=':memberId' element={<ChatPage />} />
            <Route index element={<Navigate to={'/'} replace />} />
          </Route>
        </Route>
        <Route path='/*' element={<ControlPage Component={HomePage} />} >
        </Route>
      </Routes>
    </div>
  )
}

export default App


