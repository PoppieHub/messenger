import {UserListItem} from "../models/response/UserListItem";
import Store from "../store/store";
import {ReadMessageListResponse} from "../models/response/ReadMessageListResponse";
import {ContentListItem} from "../models/response/ContentListItem";
import mime from "mime";
import {MessagesListItem} from "../models/response/MessagesListItem";
import {MessageItem} from "../models/response/MessageItem";
import {ContentListResponse} from "../models/response/ContentListResponse";
import {MessagesShortListResponse} from "../models/response/MessagesShortListResponse";

export const isMe = (user: UserListItem, store: Store): boolean => {
    return store.getProfile().id === user.id;
}

export const checkRead = (read: ReadMessageListResponse): boolean => {
    return read.items && read.items.length > 0;
}

export const checkMimeType = (content: ContentListItem, type:string): boolean => {
    return !!(content.link && mime.getType(content.link)?.includes(type));
}

export const getHelloMessage = (store: Store): MessagesListItem => {
    const contentList: ContentListResponse = {
        items:[]
    };
    const replyMessage: MessagesShortListResponse = {
        items:[]
    };
    const helloMessageItem: MessageItem = {
        message:`${store.getProfile().firstName || store.getProfile().nickname}, напишите сообщение, чтобы начать общаться!`,
        replyMessage: replyMessage,
        content:contentList
    };

    return (
        {
            id: `unique - ${Math.floor(Math.random() * 9999)}`,
            user: store.getProfile(),
            body_message: helloMessageItem,
            created_at: 0
        });
}