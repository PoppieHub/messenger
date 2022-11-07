import {MessagesListItem} from "../models/response/MessagesListItem";
import {MessagesListResponse} from "../models/response/MessagesListResponse";
import {UserListItem} from "../models/response/UserListItem";
import Store from "../store/store";

export const getLastMessage = (messagesList: MessagesListResponse): MessagesListItem => {
    return messagesList.items[messagesList.items.length - 1];
}

export const getUserNameLastMessage = (user: UserListItem, store: Store): string => {
    return (user.id === store.getProfile().id)?'Вы:':`${user.firstName || user.nickname}:`;
}