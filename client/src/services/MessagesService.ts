import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class MessagesService {
    // static getChats(idUser: string): Promise<any> {
    //     return $api.post<any>('/get-chats', {idUser})
    // }

    static addMessages(room: string, idUser: string, message: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/add-messages', {room, idUser, message})
    }

    // static removeFriend(id: number): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/remove-friend', {id})
    // }

}