import {AppStateType} from "../store";

export const getCondition = (state: AppStateType) => state.login_reducer.condition
export const getError = (state: AppStateType) => state.login_reducer.error
export const getAuth = (state: AppStateType) => state.AuthReducer.isAuth
export const getAuthReducerCondition = (state: AppStateType) => state.AuthReducer.condition