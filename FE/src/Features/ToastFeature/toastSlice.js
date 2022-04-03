import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        listToast: []
    },
    reducers: {
        addToast(state, action) {
            state.listToast = [action.payload, ...state.listToast]
        },
        removeToast(state, action) {
            state.listToast = [...state.listToast.filter((item, index) => item.id != action.payload)]
        }

    }

})

const { reducer, actions } = toastSlice
export const { addToast, removeToast } = actions
export default reducer