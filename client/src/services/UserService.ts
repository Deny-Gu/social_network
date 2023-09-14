import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static editUser(email: string, firstname: string, lastname: string, birthday: string, city: string, education: string, phone: string, aboutMe: string): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/user-edit', {email, firstname, lastname, birthday, city, education, phone, aboutMe})
    }
}
