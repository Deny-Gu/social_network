import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class RecordsService {
    static fetchRecords(idUser: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/records', {idUser})
    }

    static addRecord(idUser: string, idFrom: string, date: string, message: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/add-record', {idUser, idFrom, date, message})
    }

    static removeRecord(id: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-record', {id})
    }

    static editRecord(id: number, message: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/edit-record', {id, message})
    }
}