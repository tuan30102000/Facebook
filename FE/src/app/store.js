import { configureStore, } from "@reduxjs/toolkit";
import userReducer from '../Features/AuthFeature/userSlice';
import postReducer from '../Features/PostFeature/postSlice';

const rootReducer = {
    user: userReducer,
    post: postReducer,
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store