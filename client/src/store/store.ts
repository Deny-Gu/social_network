import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { IRecords } from "../models/IRecords";
import RecordsService from "../services/RecordsService";

export default class Store {
    user = {} as IUser;
    records = {} as IRecords;
    isAuth = false;
    isLoading = false;
    error = ''

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setRecords(records: any) {
        this.records = records;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setError(error: string) {
        this.error = error;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async getRecords(idUser: string) {
        try {
            const response = await RecordsService.fetchRecords(idUser);
            this.setRecords(response.data)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}
