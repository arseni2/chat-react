import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profile} from "../../api/auth";

export enum AppCondition {
    success = 'success',
    error = 'error',
    loading = 'loading',
}
export type userType = {
    _id: string
    avatar: string
    last_seen: string
    name: string
    lastname: string
    isOnline: boolean
}
type initialStateType = {
    condition: AppCondition
    isAuth: boolean
    user: userType | {}
}

const initialState: initialStateType = {
    isAuth: false,
    condition: AppCondition.loading,
    user: {}
}
export const getAuthUserDataThunk = createAsyncThunk('user/getData', async () => {
    return await profile()
})
export const authSlice = createSlice({
    name: 'auth-reducer',
    initialState,
    reducers: {
        set_auth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
    extraReducers: {
        [getAuthUserDataThunk.fulfilled.type]: (state, action: PayloadAction<userType>) => {
            state.user = action.payload
            state.condition = AppCondition.success
            state.isAuth = true
        },
        [getAuthUserDataThunk.pending.type]: (state) => {
            state.condition = AppCondition.loading
        },
        [getAuthUserDataThunk.rejected.type]: (state) => {
            state.condition = AppCondition.error
            state.isAuth = false
        },
    }
})

export const {set_auth} = authSlice.actions

//export const initializeAppThunk = '' //https://github.com/it-kamasutra/react-way-of-samurai/blob/master/src/redux/app-reducer.ts


export const AuthReducer = authSlice.reducer

