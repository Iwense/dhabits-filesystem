import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";


export const getRoot = createAsyncThunk(
    'filesystem/getRoot',
    async(payload, thunkApi) => {
        try {
            const res = await api.get('/api/filesystem/')
            return res?.data?.children
        } catch (error) {
            console.log("Error fetching filesystem | store/api.ts", error)
            return thunkApi.rejectWithValue(error)
        }
    }
)