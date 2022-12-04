import {makeAutoObservable} from "mobx";
import SignInRequest from "../models/request/SignInRequest";
import SignUpRequest from "../models/request/SignUpRequest";
import {UserService, AuthService, ChatService} from "../services/";
import {UserListItem} from "../models/response/UserListItem";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {refreshToken} from "../routes";
import ForgotPasswordRequest from "../models/request/ForgotPasswordRequest";
import {ChatsListResponse} from "../models/response/ChatsListResponse";

export default class Store {

    private isAuth: boolean = false;
    private profile = {} as UserListItem;
    public chats = {} as ChatsListResponse;
    private isLoading: boolean = false;
    private isError: boolean = false;

    public constructor() {
        makeAutoObservable(this);
    }

    private setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    public getAuth: () => boolean = () => {
        return this.isAuth;
    }

    public getProfile(): UserListItem {
        return this.profile;
    }

    private setProfile(profile: UserListItem): void {
        this.profile = profile;
    }

    public getChats(): ChatsListResponse {
        return this.chats;
    }

    private setChats(chats: ChatsListResponse): void {
        this.chats = chats;
    }

    private setLoading(bool: boolean): void {
        this.isLoading = bool;
    }

    public getLoading: () => boolean = () => {
        return this.isLoading;
    }

    public setIsError(bool: boolean): void {
        this.isError = bool;
    }

    public getIsError(): boolean {
        return this.isError;
    }

    public setTokensTolLocalStorage(response: AxiosResponse<AuthResponse>): void {
        localStorage.setItem(
            `${process.env.REACT_APP_NAME_TOKEN}`,
            response.data.token
        );
        localStorage.setItem(
            `${process.env.REACT_APP_NAME_REFRESH_TOKEN}`,
            response.data.refresh_token
        );
    }

    public removeTokensTolLocalStorage(): void {
        localStorage.removeItem(`${process.env.REACT_APP_NAME_TOKEN}`);
        localStorage.removeItem(`${process.env.REACT_APP_NAME_REFRESH_TOKEN}`);
    }

    private async getProfileFromAPI() {
        try {
            const response = await UserService.profile();
            this.setProfile(response.data);
        } catch (e) {
            this.removeTokensTolLocalStorage();
            this.setIsError(true);
        }
    }

    public async signIn(request: SignInRequest) {
        try {
            const response = await AuthService.signIn(request);
            this.setTokensTolLocalStorage(response);
            this.setAuth(true);
            await this.getProfileFromAPI();
        } catch (e) {
            this.setIsError(true);
        }
    }

    public async signUp(request: SignUpRequest) {
        try {
            const response = await AuthService.signUp(request);
            this.setTokensTolLocalStorage(response);
            this.setAuth(true);
            await this.getProfileFromAPI();
        } catch (e) {
            this.setIsError(true);
        }
    }

    public async forgotPassword(request: ForgotPasswordRequest) {
        try {
            await AuthService.forgotPassword(request);
        } catch (e) {
            this.setIsError(true);
        }
    }

    public logout() {
        this.removeTokensTolLocalStorage();
        this.setAuth(false);
        this.setProfile({} as UserListItem);
    }

    public async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post<AuthResponse>(
                refreshToken(),
                {
                    "refresh_token": localStorage.getItem(`${process.env.REACT_APP_NAME_REFRESH_TOKEN}`)
                }
            );
            this.setTokensTolLocalStorage(response);
            this.setAuth(true);
            await this.getProfileFromAPI();
        } catch (e) {
            this.removeTokensTolLocalStorage();
            this.setIsError(true);
        } finally {
            this.setLoading(false);
        }
    }

    public async getChatsFromAPI() {
        try {
            return await ChatService.getChatsList().then((res: any) => (
                this.setChats(res.data)
            ));
        } catch (e: any) {
            console.error(e.response.data.message);
        }
    }
}