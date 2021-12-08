import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getUsersSearch, userPaginationData, usersPaginationSearchType } from "../../api/user";
import { set_auth, userType } from "./authReducer";
import { UserLoginCondition } from "./loginReducer";

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


export const usersPaginationSearchThunk = createAsyncThunk('users/search_pagination', async (payload: usersPaginationSearchType, thunkAPI) => {
    try {
        //проблема в том что если санка примет состояние fulfilled то диспач экшен нечего не изменит 
        return await getUsersSearch({...payload})
    } catch (e) { 
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{error: {message: string}}>} = e
        if(error.response.status === 401) {
            thunkAPI.dispatch(set_auth(false))
            return thunkAPI.rejectWithValue(error.response.data.error.message)
        }
    }
})  
export const usersSlice = createSlice({
    initialState,
    name: "users-reducer",
    reducers: {
        set_user: (state) => {
            state.users = []
        }
    },
    extraReducers: {
        [usersPaginationSearchThunk.fulfilled.type]: (state, action: PayloadAction<userPaginationData>) => {
            state.users = [...state.users, ...action.payload.docs]
            state.condition = UserLoginCondition.success
            state.hasNextPage = action.payload.hasNextPage
            state.totalCount = action.payload.totalDocs
        },
        [usersPaginationSearchThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading

        },
        [usersPaginationSearchThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.condition = UserLoginCondition.error
            state.error = action.payload
            state.hasNextPage = false
        }
    }
})
export const {set_user} = usersSlice.actions

export const UsersReducer = usersSlice.reducer