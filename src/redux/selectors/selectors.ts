import {AppStateType} from "../store";

export const getCondition = (state: AppStateType) => state.login_reducer.condition
export const getError = (state: AppStateType) => state.login_reducer.error
export const getAuth = (state: AppStateType) => state.AuthReducer.isAuth
export const getAuthReducerCondition = (state: AppStateType) => state.AuthReducer.condition
export const getUsers = (state: AppStateType) => state.UsersReducer.users
export const getUsersLength = (state: AppStateType) => state.UsersReducer.users.length
export const getUsersError = (state: AppStateType) => state.UsersReducer.error
export const getUsersCondition = (state: AppStateType) => state.UsersReducer.condition
export const getUsersPaginationTotalCount= (state: AppStateType) => state.UsersReducer.totalCount