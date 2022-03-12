import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../Api/userApi";
import method from "../../Constan/method";
import StorageKey from "../../Constan/StorageKey";
export const registerThunk = createAsyncThunk('user/register', async (data) => {
    const result = await userApi.register(data)
    return result
})

export const login = createAsyncThunk('user/login', async (data) => {
    const result = await userApi.login(data)
    return result
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        showSnack: false,
        login: false,
        loginPending: false,
        loginError: false,
        snackMessage: '',
        setting: {}
    }
    ,
    reducers: {
        logout(state) {
            state.login = false
            state.current = null
        }
        ,
        hiddenSnack(state) {
            state.showSnack = false
        }

    },
    extraReducers: {
        [registerThunk.fulfilled]: (state, action) => {
            method.setToken(action.payload.accessToken, action.payload.refreshToken)
            state.loginPending = false
            state.showSnack = true
            state.snackMessage = 'Dang ki thanh cong'
            state.login = true
            state.current = { ...action.payload, refreshToken: undefined }
        },
        [registerThunk.pending]: (state) => {
            state.loginPending = true
        }
        ,
        [registerThunk.rejected]: (state, action) => {
            state.loginError = true
            state.loginPending = false
            console.log('Error ở extraReducer.reject:', action)
            // throw new Error('Required')
        }
        ,

        [login.fulfilled]: (state, action) => {
            method.setToken(action.payload.accessToken, action.payload.refreshToken)
            state.loginPending = false
            state.showSnack = true
            state.login = true
            state.snackMessage = 'Dang nhap thanh cong'
            state.current = { ...action.payload, refreshToken: undefined }
        },
        [login.rejected]: (state,) => {
            state.loginError = true
            state.loginPending = false
        },
        [login.pending]: (state,) => {
            state.loginPending = true
        }
    }
})


const { reducer, actions } = userSlice
export const { logout, hiddenSnack, } = actions
export default reducer