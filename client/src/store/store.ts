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
import { IAlbums } from "../models/IAlbums";
import AlbumsService from "../services/AlbumsService";
import { IPhoto } from "../models/IPhoto";

export default class Store {
    user = {} as IUser;
    users = [];
    records = {} as IRecords;
    albums = {} as IAlbums;
    photo = {} as IPhoto;
    editAlbum = [];
    isAuth = false;
    isLoading = false;
    isLoadingUsers = false;
    isLoadingRecords = false;
    isLoadingAlbums = false;
    isLoadingPhoto = false;
    error = '';
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

    setUsers(users: any) {
        this.users = users;
    }

    setRecords(records: any) {
        this.records = records;
    }

    setAlbums(albums: any) {
        this.albums = albums;
    }

    setPhoto(photo: any) {
        this.photo = photo;
    }

    setEditAlbum(album: any) {
        this.editAlbum = album;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setLoadingUsers(bool: boolean) {
        this.isLoadingUsers = bool;
    }

    setLoadingRecords(bool: boolean) {
        this.isLoadingRecords = bool;
    }

    setLoadingAlbums(bool: boolean) {
        this.isLoadingAlbums = bool;
    }

    setLoadingPhoto(bool: boolean) {
        this.isLoadingPhoto = bool;
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

    async getUsers() {
        this.setLoadingUsers(true)
        try {
          const response = await UserService.fetchUsers()
          this.setUsers(response.data)
        } catch (e) {
          console.log(e)
        } finally {
            this.setLoadingUsers(false)
        }
    }

    async editUser(email: string, firstname: string, lastname: string, birthday: string, city: string, education: string, phone: string, aboutMe: string) {
        try {
            const response = await UserService.editUser(email, firstname, lastname, birthday, city, education, phone, aboutMe);
            this.setUser(response.data.user)
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
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async removeAvatar(email: string) {
        try {
            const response = await AvatarService.removeAvatar(email);
            this.setAvatarUrl('')
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async getRecords(idUser: string) {
        this.setLoadingRecords(true)
        try {
            const response = await RecordsService.fetchRecords(idUser);
            this.setRecords(response.data)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        } finally {
            this.setLoadingRecords(false)
        }
    }

    async addRecord(idUser: string, idFrom: string, date: string, message: string) {
        try {
            const response = await RecordsService.addRecord(idUser, idFrom, date, message);
            this.getRecords(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async removeRecord(id: number, idUser: string) {
        try {
            const response = await RecordsService.removeRecord(id);
            this.getRecords(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async editRecord(id: number, idUser: string, message: string) {
        try {
            const response = await RecordsService.editRecord(id, message);
            this.getRecords(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async getAlbums(idUser: string) {
        this.setLoadingAlbums(true)
        try {
            const responseAlbum = await AlbumsService.getAlbums(idUser);
            const responsePhoto = await AlbumsService.getPhoto(idUser);
            let albums = responseAlbum.data;
            let photo = responsePhoto.data;

            for (let i = 0; i < albums.length; i++) {
                albums[i].photo = []
                for (let p = 0; p < photo.length; p++) {
                    if (photo[p]) {
                        if (albums[i].id === photo[p].idAlbum) {
                            albums[i].photo.push(photo[p])
                        }
                    }
                }
                if (albums[i].photo[0]) {
                    if (!albums[i].cover) {
                        albums[i].cover = albums[i].photo[0].photo
                    }
                }
            }

            this.setAlbums(albums);
        } catch (e: any) {
            this.setError(e.responseAlbum?.data?.message)
        } finally {
            this.setLoadingAlbums(false)
        }
    }

    async addAlbum(email: string, idUser: string, albumTitle: string) {
        try {
            const response = await AlbumsService.addAlbum(email, idUser, albumTitle);
            this.getAlbums(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async removeAlbum(id: number, titleAlbum: string, idUser: string) {
        try {
            const response = await AlbumsService.removeAlbum(id, titleAlbum);
            this.getAlbums(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

    async getPhoto(idUser: string) {
        this.setLoadingPhoto(true)
        try {
            const response = await AlbumsService.getPhoto(idUser);
            this.setPhoto(response.data)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        } finally {
            this.setLoadingPhoto(false)
        }
    }

    async removePhoto(id: number, email: string, albumTitle: string, namePhoto: string,  idUser: string) {
        try {
            const response = await AlbumsService.removePhoto(id, email, albumTitle, namePhoto);
            this.getAlbums(idUser)
        } catch (e: any) {
            this.setError(e.response?.data?.message)
        }
    }

}
