import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class AlbumsService {
    static getAlbums(idUser: string): Promise<any> {
        return $api.post<any>('/get-albums', {idUser})
    }

    static addAlbum(email: string, idUser: string, albumTitle: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/add-album', {email, idUser, albumTitle})
    }

    static removeAlbum(id: number, email: string, albumTitle: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-album', {id, email, albumTitle})
    }

    static getPhoto(idUser: string): Promise<any> {
        return $api.post<any>('/get-photo', {idUser})
    }

    static removePhoto(id: number, email: string, albumTitle: string, namePhoto: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-photo', {id, email, albumTitle, namePhoto})
    }

    static editCover(id: number, cover: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/edit-cover', {id, cover})
    }

    static editTitleAlbum(id: number, email: string, oldAlbumTitle: string, albumTitle: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/edit-title-album', {id, email, oldAlbumTitle, albumTitle})
    }

}