import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";


interface IUserPayload {
    username: string;
    password: string;
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async(payload: IUserPayload, thunkApi) => {
        try {
            const res = await api.post('/api/auth/login', payload)
            console.log("Res login async = ", res)
            return res?.data
        } catch (error) {
            console.log("Error login | auth/authAsync.ts", error)
            // TODO: if access token expiring , should dispatch refreshToken func
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/logout',
    async(payload, thunkApi) => {
        try {
            const res = await api.post('/api/auth/logout', payload)
            console.log("Res logout async = ", res)
            return res
        } catch (error) {
            console.log("Error logout | auth/authAsync.ts", error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async(payload, thunkApi) => {
        try {
            // const {login, password} = payload
            const res = await api.post('/api/auth/refresh', payload)
            console.log("Res refresh token async = ", res)
            return res
        } catch (error) {
            console.log("Error refresh token | auth/authAsync.ts", error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signup',
    async(payload: IUserPayload, thunkApi) => {
        try {
            console.log("Payload in Async signUp = ", payload )
            const res = await api.post('/api/auth/registration', payload)
            console.log("Res regestration async = ", res)
            return res?.data
        } catch (error) {
            console.log("Error fetching filesystem | auth/authAsync.ts", error)
            return thunkApi.rejectWithValue(error)
        }
    }
)