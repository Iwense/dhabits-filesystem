import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice  from "./features/auth/auth.js"
import filesystemSlice from "./features/filesystem/filesystem.js"


const rootReducer = combineReducers({
    user: userSlice,
    filesystem: filesystemSlice,
})

export const store = configureStore({
    reducer: rootReducer
})
