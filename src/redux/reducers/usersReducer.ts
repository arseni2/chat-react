import {userType} from "./authReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers, userPaginationData, userPaginationDataPayload} from "../../api/user";
import {AxiosResponse} from "axios";
import {UserLoginCondition} from "./loginReducer";

type initialStateType = {
    users: Array<userType>
    condition: UserLoginCondition
    error: string | null
    hasNextPage: boolean
    totalCount: number
}

let initialState: initialStateType = {
    users: [],
    condition: UserLoginCondition.initial,
    error: null,
    hasNextPage: false,
    totalCount: 0
}
export const usersPaginationThunk = createAsyncThunk('users/pagination', async (payload: userPaginationDataPayload, thunkAPI) => {
    try {
        return await getUsers({...payload})
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{error: {message: string}}>} = e
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
export const usersSlice = createSlice({
    initialState,
    name: "users-reducer",
    reducers: {},
    extraReducers: {
        [usersPaginationThunk.fulfilled.type]: (state, action: PayloadAction<userPaginationData>) => {
            state.users = [...state.users, ...action.payload.docs]
            state.condition = UserLoginCondition.success
            state.hasNextPage = action.payload.hasNextPage
            state.totalCount = action.payload.totalDocs
        },
        [usersPaginationThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
        [usersPaginationThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.condition = UserLoginCondition.error
            state.error = action.payload
            state.hasNextPage = false
        }
    }
})
export const UsersReducer = usersSlice.reducer