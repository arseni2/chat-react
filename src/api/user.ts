import {userType} from "../redux/reducers/authReducer";
import {instance} from "./auth";

export type userPaginationData = {
    docs: Array<userType>
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
}
export type userPaginationDataPayload = {
    page: number
}
export const getUsers = (payload: userPaginationDataPayload) => {
    return instance.get<userPaginationData>(`/user/all?page=${payload.page}`).then(res => res.data)
}

