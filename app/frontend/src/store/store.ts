import {makeAutoObservable} from "mobx";
import SignInRequest from "../models/request/SignInRequest";
import SignUpRequest from "../models/request/SignUpRequest";
import {UserService, AuthService, ChatService, MessageService} from "../services/";
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
import {ShortChatList} from "../models/uploadedStoreModel/ShortChatList";
import {InputTextList} from "../models/inputDialogModel/InputTextList";
import MessageRequest from "../models/request/MessageRequest";
import UpdateMessageItem from "../models/request/UpdateMessageItem";
import {MessagesShortListRequest} from "../models/request/MessagesShortListRequest";

export default class Store {
    private isAuth: boolean = false;
    public profile = {} as UserListItem;
    public chats = {} as ChatsListResponse;
    public currentDialog = {} as ChatsListItem;
    public viewedDialogId: number | null = null;
    public contacts = {} as ContactListResponse;
    private viewedUserProfile = {} as UserListItem;
    public viewedUserProfileId: string | null = null;
    public uploadedContentForChats = {} as ShortChatList;
    public dialogInput = {} as InputTextList;
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

    public getUploadedContentForChats(): ShortChatList {
        return this.uploadedContentForChats;
    }

    public setUploadedContentForChats(uploaded: ShortChatList): void {
        this.uploadedContentForChats = uploaded;
    }

    public getDialogInput(): InputTextList {
        return this.dialogInput;
    }

    public setDialogInput(dialogInput: InputTextList): void {
        this.dialogInput = dialogInput;
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

    public getContacts(): ContactListResponse {
        return this.contacts;
    }

    public setContacts(contacts: ContactListResponse): void {
        this.contacts = contacts;
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

    public async getDialogOrNewFromAPI(otherUser: UserListItem) {
        try {
            let chat = {} as ChatsListItem;

            await ChatService.getDialogOrNew(otherUser.id).then((res) => {
                if (res.status === 200) {
                    const chatsList: ChatsListResponse = {
                        items: this.getChats().items.slice() || []
                    };
                    let flag: boolean = false;

                    chatsList.items.forEach((item) => {
                        if (item.id === res.data.id) {
                            chat = item;
                            flag = true;
                        }
                    });

                    if (!flag) {
                        // @ts-ignore
                        chatsList.items.push(res.data);
                        this.setChats({
                            ...this.getChats(),
                            ...chatsList
                        });
                        chat = res.data;
                    }
                }
            });
            return chat;
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async uploadFiles(collectionFiles: File[]) {
        try {
            const chatId: number = this.getViewedDialogId() || 0;

            let chatsWithUploaded = {
                items: (this.getUploadedContentForChats().items)?
                    this.getUploadedContentForChats().items.slice():
                    []
            } as ShortChatList;

            if (!chatsWithUploaded.items[chatId]) {
                chatsWithUploaded.items[chatId] = {
                    uploadedContent: {
                        items: []
                    }
                }
            }

            collectionFiles.map(async (file: File) => {
                const formData: FormData = new FormData();

                if (file.type.includes("image")) {
                    formData.append('image', file);

                    await ContentService.uploadImage(formData).then((res) => {
                        if (res.status === 200) {
                            // @ts-ignore
                            chatsWithUploaded.items[chatId].uploadedContent.items.push(res.data);

                            this.setUploadedContentForChats({
                                ...this.getUploadedContentForChats(),
                                ...chatsWithUploaded
                            });
                        }
                    });
                } else {
                    formData.append('file', file);

                    await ContentService.uploadFile(formData).then((res) => {
                        if (res.status === 200) {
                            // @ts-ignore
                            chatsWithUploaded.items[chatId].uploadedContent.items.push(res.data);

                            this.setUploadedContentForChats({
                                ...this.getUploadedContentForChats(),
                                ...chatsWithUploaded
                            });
                        }
                    });
                }
            });
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteUploadedContent(chatId: number, contentId: string) {
        let contentListItem = {} as ContentListItem;
        const tempUploadedContent: ShortChatList = (this.getUploadedContentForChats())?
            {...this.getUploadedContentForChats()}:
            {items: []};

        if (tempUploadedContent.items[chatId]) {
            tempUploadedContent.items[chatId].uploadedContent.items.forEach((item: ContentListItem, index) => {
                if (item.id === contentId) {
                    contentListItem = {...item};
                    tempUploadedContent.items[chatId].uploadedContent.items.splice(index, 1);
                }
            });
        }

        this.setUploadedContentForChats({
            ...this.getUploadedContentForChats(),
            ...tempUploadedContent
        });

        if (contentListItem) {
            try {
                await ContentService.deleteContent(contentListItem).then();

            } catch (e: any) {
                if (e.response?.data?.message!) {
                    console.error(e.response.data.message);
                }
            }
        }
    }

    public async addMessageAPI(message: MessageRequest) {
        try {
            await MessageService.addMessage(message).then();
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async updateMessageAPI(message: UpdateMessageItem) {
        try {
            await MessageService.updateMessage(message).then();
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }

    public async deleteMessagesAPI(shortMessagesCollection: MessagesShortListRequest) {
        try {
            await MessageService.deleteMessages(shortMessagesCollection).then();
        } catch (e: any) {
            if (e.response?.data?.message!) {
                console.error(e.response.data.message);
            }
        }
    }
}