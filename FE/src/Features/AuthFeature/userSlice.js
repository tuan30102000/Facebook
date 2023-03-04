import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../Api/userApi";
import userAuth from "../../Api/userAuthApi";
import initGlobalState from "../../Constan/initGlobalState";
import method from "../../Constan/method";
import socket from "../../Constan/socket";
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
export const logout = createAsyncThunk('user/logout', async () => {
    await userAuth.logout()
    return
})

const nameSlice = 'user'
const userSlice = createSlice({
    name: nameSlice,
    initialState: initGlobalState[nameSlice]
    ,
    reducers: {
        updateUser(state, action) {
            state.current.data = action.payload
        },
        updateUserInfo(state, action) {
            console.log(action.payload)
            state.current.data[action.payload.key] = action.payload.data
        },
        addSocket(state, action) {
            state.socket = action.payload
        },
        removeSocket(state) {
            state.socket = null
        }

    },
    extraReducers: {
        [registerThunk.fulfilled]: (state, action) => {
            method.setAccessToken(action.payload.accessToken)
            state.loginPending = false
            state.login = true
            state.current = { ...action.payload, }
            state.socket = socket()
            createToast('Đăng kí thành công')
        },
        [registerThunk.pending]: (state) => {
            state.loginPending = true
        }
        ,
        [registerThunk.rejected]: (state, action) => {
            state.loginError = true
            state.loginPending = false
            createToast(action.error.message, 'error')

            // throw new Error('Required')
        }
        ,

        [login.fulfilled]: (state, action) => {
            method.setAccessToken(action.payload.accessToken)
            state.loginPending = false
            state.login = true
            state.current = { ...action.payload, }
            state.socket = socket()
            createToast('Đăng nhập thành công')

        },
        [login.rejected]: (state, action) => {
            state.loginError = true
            state.loginPending = false
            createToast(action.error.message, 'error')

        },
        [login.pending]: (state,) => {
            state.loginPending = true
        },
        [loginWithRefeshToken.fulfilled]: (state, action) => {
            method.setAccessToken(action.payload.accessToken)
            state.isFirstLoad = false
            state.login = true
            state.current = { ...action.payload, refreshToken: undefined }
            state.socket = socket()

        },
        [loginWithRefeshToken.pending]: (state, action) => {
            state.isFirstLoad = true
        },
        [loginWithRefeshToken.rejected]: (state, action) => {
            state.isFirstLoad = false
            state.login = false
        },
        [logout.fulfilled]: (state, action) => {
            method.removeAccessToken()
            state = initGlobalState[nameSlice]
            return state
        },
    }
})


const { reducer, actions } = userSlice
export const { updateUser, updateUserInfo, addSocket, removeSocket } = actions
export default reducer