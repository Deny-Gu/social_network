import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class AlbumsService {
    static getAlbums(idUser: string): Promise<any> {
        return $api.post<any>('/get-albums', {idUser})
    }

    // static getAlbums(idUser: string): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/get-albums', {idUser})
    // }

    static addAlbum(email: string, idUser: string, albumTitle: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/add-album', {email, idUser, albumTitle})
    }

    static removeAlbum(id: number, titleAlbum: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-album', {id, titleAlbum})
    }

    // static editAlbum(id: number, message: string): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/edit-record', {id, message})
    // }

    static getPhoto(idUser: string): Promise<any> {
        return $api.post<any>('/get-photo', {idUser})
    }

    // static getPhoto(idUser: string): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('/get-photo', {idUser})
    // }

    static removePhoto(id: number, email: string, albumTitle: string, namePhoto: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-photo', {id, email, albumTitle, namePhoto})
    }

}