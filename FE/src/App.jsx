import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import SnackBar from './Components/SnackBar';
import AuthFeature from "./Features/AuthFeature";
import LoginPage from './Features/AuthFeature/page/LoginPage';
import RegisterPage from './Features/AuthFeature/page/RegisterPage';
import ControlPage from './Features/PostFeature';
function App() {
  const user = useSelector(state => state.user)
  return (
    <div className="app w-screen h-screen bg-[#F0F2F5]">
      {user.showSnack && <SnackBar message={user.snackMessage} />}

      <Routes>
        <Route path='/auth' element={<AuthFeature />} >
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route index element={<Navigate to='login' push />} />
          <Route />
        </Route>
        <Route path='/*' element={<ControlPage />} >

        </Route>
      </Routes>


    </div>
  )
}

export default App


