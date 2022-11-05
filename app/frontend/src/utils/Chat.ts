import {MessagesListItem} from "../models/response/MessagesListItem";
import {MessagesListResponse} from "../models/response/MessagesListResponse";

export const getLastMessage = (messagesList: MessagesListResponse): MessagesListItem => {
    return messagesList.items[messagesList.items.length - 1];
}
