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
import {ChatsListItem} from "../models/response/ChatsListItem";
import ProfileRequest from "../models/request/ProfileRequest";
import {ContentListItem} from "../models/response/ContentListItem";
import ContentService from "../services/ContentService";
import {ContentListResponse} from "../models/response/ContentListResponse";
import {ContactListResponse} from "../models/response/ContactListResponse";
import ContactService from "../services/ContactService";
import {ContactListItem} from "../models/response/ContactListItem";

export default class Store {
    private isAuth: boolean = false;
    public profile = {} as UserListItem;
    public chats = {} as ChatsListResponse;
    public currentDialog = {} as ChatsListItem;
    public viewedDialogId: number | null = null;
    public contacts = {} as ContactListResponse;
    private viewedUserProfile = {} as UserListItem;
    public viewedUserProfileId: string | null = null;
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

    public setProfile(profile: UserListItem): void {
        this.profile = profile;
    }

    public getChats(): ChatsListResponse {
        return this.chats;
    }

    private setChats(chats: ChatsListResponse): void {
        this.chats = chats;
    }

    public getCurrentDialog(): ChatsListItem {
        return this.currentDialog;
    }

    public setCurrentDialog(currentDialog: ChatsListItem): void {
        this.currentDialog = currentDialog;
    }

    public getViewedDialogId(): number | null {
        return this.viewedDialogId;
    }

    public setViewedDialogId(viewedDialogId: number | null): void {
        this.viewedDialogId = viewedDialogId;
    }

    public getContacts(): ContactListResponse {
        return this.contacts;
    }

    public setContacts(contacts: ContactListResponse): void {
        this.contacts = contacts;
    }

    public getViewedUserProfile(): UserListItem {
        return this.viewedUserProfile;
    }

    public setViewedUserProfile(viewedUserProfile: UserListItem): void {
        this.viewedUserProfile = viewedUserProfile;
    }

    public getViewedUserProfileId(): string | null {
        return this.viewedUserProfileId;
    }

    public setViewedUserProfileId(viewedUserProfileId: string | null): void {
        this.viewedUserProfileId = viewedUserProfileId;
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

    public async getProfileFromAPI() {
        try {
            const response = await UserService.profile();
            this.setProfile(response.data);
        } catch (e) {
            this.removeTokensTolLocalStorage();
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
        } finally {
            setTimeout(() => {
                this.setIsError(false);
            }, 5000);
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
        } finally {
            setTimeout(() => {
                this.setIsError(false);
            }, 5000);
        }
    }

    public async forgotPassword(request: ForgotPasswordRequest) {
        try {
            await AuthService.forgotPassword(request);
        } catch (e) {
            this.setIsError(true);
        }
    }

     public logout = (): void => {
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
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteProfileFromAPI() {
        try {
            this.setLoading(true);
            await UserService.deleteProfile().then((res: any) => {
                if (res.data.request_status!) {
                    this.logout();
                }
            });

        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        } finally {
            this.setLoading(false);
        }
    }

    public async updateProfileFromAPI(profileRequest: ProfileRequest) {
        try {
            await UserService.updateProfile(profileRequest).then((res: any) => {
                if (res.status === 200) {
                    this.setProfile({
                        ...this.getProfile(),
                        ...res.data
                    });
                    this.setIsError(false);
                }
            });

        } catch (e: any) {
            if (e.response?.data?.message!) {
                this.setIsError(true);
                console.error(e.response.data.message);
            }
        } finally {
            setTimeout(() => {
                this.setIsError(false);
            }, 5000);
        }
    }

    public async uploadAvatar(file: File) {
        try {
            const formData: FormData = new FormData();
            formData.append('avatar', file);

            await UserService.uploadAvatar(formData).then((res) => {
                if (res.status === 200) {
                    const profileContents: ContentListResponse = {
                        items: this.getProfile().content?.items.slice() || []
                    };

                    // @ts-ignore
                    profileContents.items.push(res.data);

                    this.setProfile({
                        ...this.getProfile(),
                        content: profileContents
                    });
                }
            });
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteUserAvatarFromAPI(data: ContentListItem, index: number) {
        try {
            await ContentService.deleteContent(data).then((res: any) => {
                if (
                    res.status === 200 &&
                    data.id &&
                    data.avatar &&
                    this.getProfile().content?.items
                ) {
                    const profileContents: ContentListResponse = {
                        items: this.getProfile().content?.items.slice() || []
                    };

                    profileContents.items.splice(index, 1);

                    this.setProfile({
                        ...this.getProfile(),
                        content: profileContents
                    });
                }
            });

        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteChatAvatarFromAPI(data: ContentListItem, index: number, chatsListItem: ChatsListItem) {
        try {
            await ContentService.deleteContent(data).then((res: any) => {
                if (res.status === 200 && data.id && data.avatar) {
                    const chats: ChatsListResponse = {
                        items: this.getChats().items.slice() || []
                    };

                    chats.items.forEach((chat, indexChat) => {
                        if (chatsListItem.id === chat.id) {
                            chats.items[indexChat].content?.items.splice(index, 1);
                        }
                    });

                    this.setChats({
                        ...this.getChats(),
                        items: chats.items
                    });
                }
            });

        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async getContactsFromAPI() {
        try {
            await ContactService.getContacts().then((res: any) => {
                if (res.status === 200) {
                    this.setContacts({
                        ...this.getContacts(),
                        ...res.data
                    });
                }
            });
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async addContactFromAPI(contactId: string) {
        try {
            await ContactService.addContact(contactId).then((res) => {
                if (res.status === 200) {
                    const contactsList: ContactListResponse = {
                        items: this.getContacts().items.slice() || []
                    };

                    // @ts-ignore
                    contactsList.items.push(res.data);

                    this.setContacts({
                        ...this.getContacts(),
                        ...contactsList
                    });
                }
            });
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async acceptContactFromAPI(contact: ContactListItem, index: number) {
        try {
            if (contact.id) {
                await ContactService.acceptContact(contact.id).then((res) => {
                    if (res.status === 200) {
                        const contactsList: ContactListResponse = {
                            items: this.getContacts().items.slice() || []
                        };

                        if (contactsList.items[index]) {
                            contactsList.items[index].status = true;
                        }

                       this.setContacts({
                            ...this.getContacts(),
                            ...contactsList
                        });
                    }
                });
            }
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteContactFromAPI(contact: ContactListItem, index: number) {
        try {
            if (contact.id) {
                await ContactService.deleteContact(contact.id).then((res) => {
                    if (res.status === 200) {
                        const contactsList: ContactListResponse = {
                            items: this.getContacts().items.slice() || []
                        };

                        contactsList.items.splice(index, 1);

                        this.setContacts({
                            ...this.getContacts(),
                            ...contactsList
                        });
                    }
                });
            }
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }
}