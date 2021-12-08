import {
    createMessage,
    createMessagePayloadType,
    getMessages,
    getMessagesPayloadType,
    messageType
} from "../../api/message";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";

type initialStateType = {
    messages: Array<messageType>
    condition: "loading" | "success" | "error"
}
const initialState: initialStateType = {
    messages: [],
    condition: "loading"
}
export const createMessageThunk = createAsyncThunk('message/create', async (payload: createMessagePayloadType, thunkAPI) => {
    try {
        return await createMessage(payload)
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{ error: { message: string } }> } = e
        console.log('createMessageThunk', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
export const getMessagesThunk = createAsyncThunk('messages/all', async (payload: getMessagesPayloadType, thunkAPI) => {
    try {
        return await getMessages(payload)
    } catch (e) {
        //@ts-ignore Type 'unknown' is not assignable to type '{ response: AxiosResponse{ error: { message: string; }; }, any>; }'.
        let error: { response: AxiosResponse<{ error: { message: string } }> } = e
        console.log('createMessageThunk', error.response.data)
        return thunkAPI.rejectWithValue(error.response.data.error.message)
    }
})
const chatSlice = createSlice({
    initialState,
    reducers: {
        add_message: (state, action: PayloadAction<messageType>) => {
            state.messages.push(action.payload)
        }
    },
    name: "chat-reducer",
    extraReducers: {
        [createMessageThunk.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
            if(action.payload) {
                state.condition = "success"
            } else {
                state.condition = "error"
            }
        },

        [getMessagesThunk.fulfilled.type]: (state, action: PayloadAction<messageType[]>) => {
            state.messages = action.payload
            state.condition = "success"
        }
    }
})

export const { add_message } = chatSlice.actions
export const ChatReducer = chatSlice.reducer