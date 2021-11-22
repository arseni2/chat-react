import { configureStore } from '@reduxjs/toolkit'
import {login_reducer} from "./reducers/loginReducer";
import {AuthReducer} from "./reducers/authReducer";
import {register_reducer} from "./reducers/registerReducer";

export const store = configureStore({
    reducer: {login_reducer, AuthReducer, register_reducer},
})
//@ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch