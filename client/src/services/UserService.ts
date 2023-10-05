import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static editUser(email: string, firstname: string, lastname: string, birthday: string, city: string, education: string, phone: string, aboutMe: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user-edit', {email, firstname, lastname, birthday, city, education, phone, aboutMe})
    }
}
