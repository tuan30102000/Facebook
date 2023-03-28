import { configureStore, } from "@reduxjs/toolkit";
import userReducer from '../Features/AuthFeature/userSlice';
import postReducer from '../Features/PostFeature/postSlice';
import chatReducer from '../Features/ChatFeature/chatSlice'
import notifyReducer from '../Features/NotifyFeature/notifySlice'
const rootReducer = {
    user: userReducer,
    post: postReducer,
    chat: chatReducer,
    notify: notifyReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store