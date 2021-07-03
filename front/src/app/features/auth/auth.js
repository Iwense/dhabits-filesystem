import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {userLogin, signUp, refreshToken} from '../auth/authAsync'
import cookie from '../../../services/cookieService'

const initialState = {
    login: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers:{
    [userLogin.fulfilled]: (state, {payload}) => {
      console.log("Payload in Login slice =", payload)
      state.login = payload.login
      cookie.set('accessToken', payload.accessToken)
      cookie.set('refreshToken', payload.refreshToken)
    },
    [signUp.fulfilled]: (state, {payload}) => {
        console.log('Payload after registration = ', payload)
    },
    [refreshToken.fulfilled]: (state, {payload}) => {
        console.log("Payload in REFRESH token slice =", payload)
    }
  }
})

// export const getUser = (state) => state.user.login
export default userSlice.reducer