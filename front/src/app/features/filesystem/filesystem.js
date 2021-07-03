import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {getRoot} from './filesystemAsync'

const initialState = {
    list: []
}


export const filesystemSlice = createSlice({
  name: 'filesystem',
  initialState,
  reducers: {
  },
  extraReducers:{
    [getRoot.fulfilled]: (state, {payload}) => {
      console.log("Payload in Slice =", payload)
      state.list = payload
    }
  }
})

export const getRootFolder = (state) => state.filesystem.list

export default filesystemSlice.reducer