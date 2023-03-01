import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "../../Api/postApi";

export const loadPost = createAsyncThunk('loadPost', async () => {

    const data = await postApi.getAllPost()
    return data

})

const postSlice = createSlice({
    name: 'post',
    initialState: {
        globalPost: [],
        isLoadPost: false,
        showLoading: false,
    },
    reducers: {
        addToStartGlobalPost: (state, action) => {
            state.globalPost = [action.payload, ...state.globalPost]
        },
        updateGlobalPost(state, action) {
            const clonePost = state.globalPost.filter(item => item._id != action.payload._id)
            state.globalPost = [action.payload, ...clonePost]
        },
        removeGlobalPost(state, action) {
            state.globalPost = state.globalPost.filter(item != action.payload)
        }
    },
    extraReducers: {
        [loadPost.fulfilled]: (state, action) => {
            state.globalPost = action.payload
            // [...state.globalPost, ...action.payload]
        }
    }
})

const { actions, reducer } = postSlice

export const { addToStartGlobalPost, updateGlobalPost, removeGlobalPost } = actions


export default reducer