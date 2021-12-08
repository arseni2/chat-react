import {instance} from "./auth";

export type userRelationType = {
    _id: string
    avatar: string
    name: string
    lastname: string
    isOnline: boolean
}

export type dialogType = {
    _id: string
    partner: userRelationType //change on userType
    author: userRelationType //change on userType
    createdAt: Date
    updatedAt: Date
}
export type getDialogDetailPayloadType = {
    id: string
}
export type createDialogType = {user_id: string}
export const getDialogs = (): Promise<dialogType[]> => instance.get<{dialogs: dialogType[]}>('/dialog/all').then(res => res.data.dialogs)

export const createDialog = (payload: createDialogType):Promise<boolean> => {
    return instance.post<{condition: boolean}>('/dialog/create', {...payload}).then(res => res.data.condition)
}
export const getDialogDetail = (payload: getDialogDetailPayloadType): Promise<dialogType> => {
    return instance.get<{dialog: dialogType}>(`/dialog/${payload.id}`).then(res => res.data.dialog)
}