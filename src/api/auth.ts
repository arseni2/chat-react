import axios from "axios";
import {userType} from "../redux/reducers/authReducer";



export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
});
export type loginParameters = {name: string, pass: string}
export type RegistrationErrorType = {
    error: {
        message: string
    }
    condition: 'error'
}
export type registerParameters = {
    name: string
    pass: string
    lastName: string
    avatar: FileList | null | undefined
    email: string
}
export enum AuthConditionEnum {
    success = 'success',
    error = 'error',
}
export const login = (payload: loginParameters) => {
    const { pass } = payload
    const { name } = payload
    return instance.post<{ condition: AuthConditionEnum }>('/login', {name, password: pass}).then(res => res.data.condition)
}

export const profile = (): Promise<userType> => {
    return instance.get<{ user: userType }>('/profile').then(res => res.data.user)
}

export const register = (payload: registerParameters): Promise<{condition: 'success'} | RegistrationErrorType> => {
    const formData = new FormData()
    // @ts-ignore
    const avatar = payload.avatar[0]
    formData.append('name', payload.name)
    formData.append('password', payload.pass)
    formData.append('lastname', payload.lastName)
    formData.append('avatar', avatar)
    formData.append('email', payload.email)
    return instance.post<{condition: 'success'}>('/registration', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}