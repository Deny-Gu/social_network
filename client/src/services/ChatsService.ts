import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class ChatsService {
    static getChats(idUser: string): Promise<any> {
        return $api.post<any>('/get-chats', {idUser})
    }

    // static addFriend(idUser: string, idFriend: string): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/add-friend', {idUser, idFriend})
    // }

    // static removeFriend(id: number): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/remove-friend', {id})
    // }

}