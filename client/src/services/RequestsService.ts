import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";


export default class RequestsService {
    static getRequestsIncoming(idUserTo: string): Promise<any> {
        return $api.post<any>('/get-requests-incoming', {idUserTo})
    }

    static getRequestsOutgoing(idUserFrom: string): Promise<any> {
        return $api.post<any>('/get-requests-outgoing', {idUserFrom})
    }

    static addRequests(idUserFrom: string, idUserTo: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/add-requests', {idUserFrom, idUserTo})
    }

    static removeRequests(id: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/remove-requests', {id})
    }

}