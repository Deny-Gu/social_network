import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { IRecords } from "../models/IRecords";
import RecordsService from "../services/RecordsService";
import UserService from "../services/UserService";
import AvatarService from "../services/AvatarService";

export default class Store {
    user = {} as IUser;
    records = {} as IRecords;
    isAuth = false;
    isLoading = false;
    error = '';
    isEditUser = false;
    API_URL_UPLOADS = 'http://localhost:5000/uploads/'

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setEditUser(bool: boolean) {
        this.isEditUser = bool;
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

    setAvatarUrl(avatarUrl: string) {
        this.user.avatar = avatarUrl;
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

    async editUser(email: string, firstname: string, lastname: string, birthday: string, city: string, education: string, phone: string, aboutMe: string) {
        try {
            const response = await UserService.editUser(email, firstname, lastname, birthday, city, education, phone, aboutMe);
            this.setEditUser(true)
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

    async uploadAvatar(file: object) {
        try {
            const response = await AvatarService.uploadAvatar(file);
            console.log(response.data)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }
}
