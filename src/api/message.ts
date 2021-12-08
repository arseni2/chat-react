import {instance} from "./auth";
import {userRelationType} from "./dialog";


export type messageType = {
    createdAt: string
    updateAt: string
    read: boolean
    text: string
    _id: string
    author: userRelationType
}
export type createMessagePayloadType = {
    text: string
    dialog_id: string
}
export const createMessage = (payload: createMessagePayloadType): Promise<boolean> => {
    return instance.post<{success: boolean}>('/message/create',{...payload}).then(res => res.data.success)
}
export type getMessagesPayloadType = {
    dialog_id: string
}
export const getMessages = (payload: getMessagesPayloadType) => {
    return instance.get<{messages: messageType}>(`/message/all?dialog_id=${payload.dialog_id}`).then(res => res.data.messages)
}