import {AppStateType} from "../store";

export const getCondition = (state: AppStateType) => state.loginReducer.condition
export const getError = (state: AppStateType) => state.loginReducer.error
export const getAuth = (state: AppStateType) => state.AuthReducer.isAuth
export const getAuthReducerCondition = (state: AppStateType) => state.AuthReducer.condition
export const getUsers = (state: AppStateType) => state.UsersReducer.users
export const getUsersLength = (state: AppStateType) => state.UsersReducer.users.length
export const getUsersError = (state: AppStateType) => state.UsersReducer.error
export const getUsersCondition = (state: AppStateType) => state.UsersReducer.condition
export const getUsersPaginationTotalCount= (state: AppStateType) => state.UsersReducer.totalCount
export const getErrorRegister = (state: AppStateType) => state.registerReducer.error
export const getConditionRegister = (state: AppStateType) => state.registerReducer.condition
export const getRedirectDialog = (state: AppStateType) => state.DialogsReducer.redirect
export const getDialogsDialog = (state: AppStateType) => state.DialogsReducer.dialogs
export const getErrorDialog = (state: AppStateType) => state.DialogsReducer.error
export const getConditionDialog = (state: AppStateType) => state.DialogsReducer.condition
export const getDialogDetail = (state: AppStateType) => state.DialogsReducer.currentDialog
export const getMessageChat = (state: AppStateType) => state.ChatReducer.messages