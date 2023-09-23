import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AvatarService {
    static async uploadAvatar(file: object): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/upload', {file})
    }

    static async removeAvatar(email: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/removeAvatar', {email})
    }
}