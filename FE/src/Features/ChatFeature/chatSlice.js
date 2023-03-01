import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initGlobalState from "../../Constan/initGlobalState";
import chatApi from '../../Api/chatApi';

export const loadConversations = createAsyncThunk('chat/loadConversation', async () => {
    const data = await chatApi.getConversations()
    return data

})
const nameSlice = 'chat'
const chatSlice = createSlice({
    name: nameSlice,
    initialState: initGlobalState[nameSlice],
    reducers: {
        addConversation(state, action) {
            state.conversations = [action.payload, ...state.conversations.filter(item => item._id != action.payload._id)]
        }
    },
    extraReducers: {
        [loadConversations.fulfilled]: (state, action) => {
            state.conversations = [...action.payload]
        }
    }
})

const { actions, reducer } = chatSlice

export const { addConversation } = actions


export default reducer