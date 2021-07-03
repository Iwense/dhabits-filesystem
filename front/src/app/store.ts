import { combineReducers, configureStore } from "@reduxjs/toolkit"
import filesystemSlice from "./features/filesystem/filesystem.js"


const rootReducer = combineReducers({
    filesystem: filesystemSlice,
})

export const store = configureStore({
    reducer: rootReducer
})
