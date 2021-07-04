import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {userLogin, signUp, refreshToken} from '../auth/authAsync'
import cookie from '../../../services/cookieService'

const initialState = {
  username: '',
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.username = ''
    }
  },
  extraReducers:{
    [userLogin.fulfilled]: (state, {payload}) => {
      state.username = payload.username
      cookie.set('username', payload.username)
      cookie.set('accessToken', payload.accessToken)
      cookie.set('refreshToken', payload.refreshToken)
    },
    [userLogin.rejected]: (state, {payload}) => {
      console.log("Error userLogin.rejected = ", payload)
      state.error = payload.toString()
    },
    [signUp.fulfilled]: (state, {payload}) => {
        state.username = payload.username
        cookie.set('username', payload.username)
        cookie.set('accessToken', payload.accessToken)
        cookie.set('refreshToken', payload.refreshToken)
    },
    [refreshToken.fulfilled]: (state, {payload}) => {
        console.log("Payload in REFRESH token slice =", payload)
    }
  }
})

export const getUser = (state) => state.user.username
export const getUserError = (state) => state.user.error

export const { logout } = userSlice.actions

export default userSlice.reducer