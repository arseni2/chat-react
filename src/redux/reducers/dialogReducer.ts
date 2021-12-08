import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { createDialog, createDialogType, dialogType, getDialogDetail, getDialogDetailPayloadType, getDialogs } from "../../api/dialog"
import { UserLoginCondition } from "./loginReducer"

type initialStateType = {
    error: string
    dialogs: Array<dialogType>
    condition: UserLoginCondition
    redirect: boolean
    currentDialog: dialogType | null
}
const initialState: initialStateType = {
    condition: UserLoginCondition.loading,
    dialogs: [],
    error: '',
    redirect: false,
    currentDialog: null,
}
export const createDialogsThunk = createAsyncThunk('dialogs/create', async (payload: createDialogType, thunkAPI) => {
    try {
        return await createDialog({ ...payload })
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{ error: { message: string } }> } = e
        console.log('createDialogsThunk', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
export const getDialogsThunk = createAsyncThunk('dialogs/get', async (_, thunkAPI) => {
    try {
        return await getDialogs()
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{ error: { message: string } }> } = e
        console.log('getDialogsThunk', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
export const getDialogDetailThunk = createAsyncThunk('dialogs/detail', async (payload: getDialogDetailPayloadType, thunkAPI) => {
    try {
        return await getDialogDetail({...payload})
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{ error: { message: string } }> } = e
        console.log('getDialogDetailThunk', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
const dialogSlice = createSlice({
    initialState,
    reducers: {
        set_redirect: (state, action: PayloadAction<boolean>) => {
            state.redirect = action.payload
        }
    },
    name: "dialogs-reducer",
    extraReducers: {
        [createDialogsThunk.fulfilled.type]: (state, action: PayloadAction<dialogType[]>) => {
            state.dialogs = action.payload
            state.condition = UserLoginCondition.success
            state.redirect = true
        },
        [createDialogsThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
        [createDialogsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.condition = UserLoginCondition.error
            state.error = action.payload
        },

        [getDialogsThunk.fulfilled.type]: (state, action: PayloadAction<dialogType[]>) => {
            state.dialogs = action.payload
            state.condition = UserLoginCondition.success
        },
        [getDialogsThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
        [getDialogsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.condition = UserLoginCondition.error
            state.error = action.payload
        },

        [getDialogDetailThunk.fulfilled.type]: (state, action: PayloadAction<dialogType>) => {
            state.currentDialog = action.payload
            state.condition = UserLoginCondition.success
        },
        [getDialogDetailThunk.pending.type]: (state) => {
            state.condition = UserLoginCondition.loading
        },
        [getDialogDetailThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.condition = UserLoginCondition.error
        }
    }
})
export const { set_redirect } = dialogSlice.actions
export const DialogsReducer = dialogSlice.reducer