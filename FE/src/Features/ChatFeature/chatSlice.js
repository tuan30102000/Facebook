import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initGlobalState from "../../Constan/initGlobalState";
import chatApi from '../../Api/chatApi';
import { logout } from "../AuthFeature/userSlice";

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
            state.conversations = [action.payload, ...state.conversations
                .filter(item => item._id != action.payload._id)]
        },
        seenConversation(state, action) {
            const newState = [...state.conversations]
            const index = newState.findIndex(item => item._id == action.payload._id)
            newState[index].seen = true
            state.conversations = newState
        }

    },
    extraReducers: {
        [loadConversations.fulfilled]: (state, action) => {
            state.conversations = [...action.payload,]
            state.isLoadConversations = false
        },
        [logout.fulfilled]: (state) => {
            state = initGlobalState[nameSlice]
            return state
        }
    }
})

const { actions, reducer } = chatSlice

export const { addConversation, seenConversation } = actions


export default reducer