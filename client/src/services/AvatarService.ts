import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AvatarService {
    static async uploadAvatar(file: object): Promise<AxiosResponse<AuthResponse>> {
        console.log(file)
        return $api.post<AuthResponse>('/upload', {file})
    }
}