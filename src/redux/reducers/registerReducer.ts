import {UserLoginCondition} from "./loginReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthConditionEnum, register, RegistrationErrorType} from "../../api/auth";
import {set_auth} from "./authReducer";

type initialStateType = {
    condition: UserLoginCondition
    error: string | null
}

export type registerThunkPayloadType = {
    pass: string
    name: string
    email: string
    avatar: FileList | null | undefined
    lastName: string
}

const initialState: initialStateType = {
    condition: UserLoginCondition.initial,
    error: null
}
export const registerThunk = createAsyncThunk(
    'user/register',
    async (payload: registerThunkPayloadType, thunkAPI) => {
        try {
            const data = await register(payload)
            data.condition === AuthConditionEnum.success && thunkAPI.dispatch(set_auth(true))
            return data
            // @ts-ignore Catch clause variable type annotation must be 'any' or 'unknown' if specified
        } catch (e: {response: { data: RegistrationErrorType }}) {
            console.log(e.response.data.error.message)
            return thunkAPI.rejectWithValue(e.response.data.error.message);
        }
    }
)
const RegisterSlice = createSlice({
    initialState,
    name: 'register-reducer',
    reducers: {},
    extraReducers: {
        [registerThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.condition = UserLoginCondition.error
        },
        [registerThunk.fulfilled.type]: (state) => {
            state.condition = UserLoginCondition.success
            state.error = null
        },
        [registerThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
    }
})

export const registerReducer = RegisterSlice.reducer