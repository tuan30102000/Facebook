import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../Api/userApi";
import method from "../../Constan/method";
import createToast from "../ToastFeature/createToast";
export const registerThunk = createAsyncThunk('user/register', async (data) => {
    const result = await userApi.register(data)
    return result
})

export const login = createAsyncThunk('user/login', async (data) => {
    const result = await userApi.login(data)
    return result
})

export const loginWithRefeshToken = createAsyncThunk('user/logintoken', async () => {
    const token = await userApi.refresh()
    return token
})

const initialState = {
    current: {},
    login: false,
    loginPending: false,
    loginError: false,
    setting: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState
    ,
    reducers: {
        logout(state) {
            state = initialState
            localStorage.clear()
            return state
        }
        , updateUser(state, action) {
            state.current.data = action.payload
        }

    },
    extraReducers: {
        [registerThunk.fulfilled]: (state, action) => {
            method.setToken(action.payload.accessToken, action.payload.refreshToken)
            state.loginPending = false
            state.login = true
            state.current = { ...action.payload, refreshToken: undefined }
            createToast('Đăng kí thành công')
        },
        [registerThunk.pending]: (state) => {
            state.loginPending = true
        }
        ,
        [registerThunk.rejected]: (state, action) => {
            state.loginError = true
            state.loginPending = false
            console.log('Error ở extraReducer.reject:', action)
            createToast('Đăng nhập thất bại', 'error')
            // throw new Error('Required')
        }
        ,

        [login.fulfilled]: (state, action) => {
            method.setToken(action.payload.accessToken, action.payload.refreshToken)
            state.loginPending = false
            state.login = true
            state.current = { ...action.payload, refreshToken: undefined }
            createToast('Đăng nhập thành công')
        },
        [login.rejected]: (state,) => {
            state.loginError = true
            state.loginPending = false
            createToast('Đăng nhập thất bại', 'error')

        },
        [login.pending]: (state,) => {
            state.loginPending = true
        },
        [loginWithRefeshToken.fulfilled]: (state, action) => {
            method.setAccessToken(action.payload.accessToken)
            state.loginPending = false
            state.login = true
            state.current = { ...action.payload, refreshToken: undefined }
            createToast('Dang nhap thanh cong')
        },
        [loginWithRefeshToken.rejected]: (state) => {
            state.loginPending = false
            state.login = false
            createToast('Đăng nhập thất bại', 'error')
        }
    }
})


const { reducer, actions } = userSlice
export const { logout, updateUser } = actions
export default reducer
// function login(state, action) {
//     method.setToken(action.payload.accessToken, action.payload.refreshToken)
//     state.loginPending = false
//     state.login = true
//     state.current = { ...action.payload, refreshToken: undefined }
// }