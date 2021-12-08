import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from "./reducers/authReducer";
import { DialogsReducer } from './reducers/dialogReducer';
import { loginReducer } from "./reducers/loginReducer";
import { registerReducer } from "./reducers/registerReducer";
import { UsersReducer } from "./reducers/usersReducer";
import {ChatReducer} from "./reducers/chatReducer";

export const store = configureStore({
    reducer: {loginReducer, AuthReducer, registerReducer, UsersReducer, DialogsReducer, ChatReducer},
})
//@ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch