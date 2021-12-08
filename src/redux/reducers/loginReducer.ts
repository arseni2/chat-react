import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthConditionEnum, login, loginParameters} from "../../api/auth";
import {set_auth} from "./authReducer";

export enum UserLoginCondition {
    error = 'error',
    loading = 'loading',
    success = 'success',
    initial = 'initial'
}

type initialStateType = {
    condition: UserLoginCondition
    error: string
}

const initialState: initialStateType = {
    condition: UserLoginCondition.initial,
    error: ''
}
export const loginThunk = createAsyncThunk(
    'user/fetchAll',
    async (payload: loginParameters, thunkAPI) => {
        try {
            const data = await login(payload)
            data === AuthConditionEnum.success && thunkAPI.dispatch(set_auth(true))
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue("Проверьте все поля и попробуйте ещё раз, не сдавайтесь")
        }
    }
)
const loginSlice = createSlice({
    name: 'user-reducer',
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled.type]: (state) => {
            state.condition = UserLoginCondition.success
        },
        [loginThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
        [loginThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.condition = UserLoginCondition.error
            state.error = action.payload
        },
    }
})

export const loginReducer = loginSlice.reducer