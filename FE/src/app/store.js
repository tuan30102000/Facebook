import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/AuthFeature/userSlice'

const rootReducer = {
    user: userReducer
}

const store = configureStore({
    reducer: rootReducer
})

export default store