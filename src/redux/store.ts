import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from "./reducers/authReducer";
import { login_reducer } from "./reducers/loginReducer";
import { register_reducer } from "./reducers/registerReducer";
import { UsersReducer } from "./reducers/usersReducer";

export const store = configureStore({
    reducer: {login_reducer, AuthReducer, register_reducer, UsersReducer}, //make rename
})
//@ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch