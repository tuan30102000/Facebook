import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import ControlPage from './Components/ControlPage';
import AuthFeature from "./Features/AuthFeature";
import LoginPage from './Features/AuthFeature/page/LoginPage';
import RegisterPage from './Features/AuthFeature/page/RegisterPage';
import { loginWithRefeshToken } from './Features/AuthFeature/userSlice';
import HomePage from './Features/PostFeature/page/HomePage';
import ListToast from './Features/ToastFeature/ListToast';
import UserControl from './Features/User';
import UserPage from './Features/User/page/UserPage';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      console.log(window.innerWidth)
      const action = loginWithRefeshToken()
      dispatch(action)
    })()
    return () => {
    }
  }, [])
  const user = useSelector(state => state.user)
  return (
    <div className="app w-full min-h-screen h-max bg-[#F0F2F5] pt-[62px]">
      <ListToast />
      <Routes>
        <Route path='/auth' element={<AuthFeature />} >
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route index element={<Navigate to='login' push />} />
        </Route>
        <Route>
          <Route path='/profile' element={<ControlPage Component={UserControl} />} >
            <Route path=':userId' element={<UserPage />} />
            <Route index element={<Navigate to={user?.current?.data?._id} push />} />
          </Route>
        </Route>
        <Route path='/*' element={<ControlPage Component={HomePage} />} >
        </Route>
      </Routes>


    </div>
  )
}

export default App


