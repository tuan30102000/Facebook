import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifyApi from "../../Api/notifyApi";
import initGlobalState from "../../Constan/initGlobalState";
import { logout } from "../AuthFeature/userSlice";

export const loadNotify = createAsyncThunk('chat/loadNotify', async (data) => {
    const notifyData = await notifyApi.getNotify({ page: 1, limit: 7 })
    return notifyData

})
export const readNotify = createAsyncThunk('chat/readNotify', async (data) => {
    const notifyData = await notifyApi.getNotify({ page: 1, limit: 7 })
    return notifyData

})
export const loadMoreNotify = createAsyncThunk('chat/loadNotifyFull', async (data, { getState }) => {
    const state = getState()
    if (state.notify.nextPage > state.notify.maxPage) throw new Error('333')
    const notifyData = await notifyApi.getNotify({ page: state.notify.nextPage, limit: 7, cursor: state.notify.cursor })
    return notifyData

})
const nameSlice = 'notify'
const notifySlice = createSlice({
    name: nameSlice,
    initialState: initGlobalState[nameSlice],
    reducers: {
        addNotify(state, action) {
            state.notifies = [action.payload, ...state.notifies]
        },
        seenNotify(state, action) {

        }

    },
    extraReducers: {
        [loadNotify.fulfilled]: (state, action) => {
            state.notifies = [...action.payload.result]
            state.maxPage = action.payload.total.maxPage
            state.isLoadNotify = false
            state.cursor = action.payload.result?.[0]?.creatTime
            state.nextPage = 2

        },
        [loadMoreNotify.fulfilled]: (state, action) => {
            // if (action.payload) return console.log('max')
            state.notifies = [...state.notifies, ...action.payload.result]
            state.nextPage = state.nextPage + 1

        },
        [loadMoreNotify.rejected]: (state, action) => {
        },
        [logout.fulfilled]: (state) => {
            state = initGlobalState[nameSlice]
            return state
        }
    }
})

const { actions, reducer } = notifySlice

export const { addNotify, seenNotify } = actions


export default reducer