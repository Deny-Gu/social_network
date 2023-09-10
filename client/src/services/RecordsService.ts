import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class RecordsService {
    static fetchRecords(idUser: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/records', {idUser})
    }
}