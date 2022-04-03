import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/AuthFeature/userSlice'
import postReducer from '../Features/PostFeature/postSlice'
import toastReducer from '../Features/ToastFeature/toastSlice'
const rootReducer = {
    user: userReducer,
    post: postReducer,
    toast: toastReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store