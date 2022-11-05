import {UserListItem} from "../models/response/UserListItem";
import Store from "../store/store";
import {ReadMessageListResponse} from "../models/response/ReadMessageListResponse";
import {ContentListItem} from "../models/response/ContentListItem";
import mime from "mime";

export const isMe = (user: UserListItem, store: Store): boolean => {
    return store.getProfile().id === user.id;
}

export const checkRead = (read: ReadMessageListResponse): boolean => {
    return read.items && read.items.length > 0;
}

export const checkMimeType = (content: ContentListItem, type:string): boolean => {
    return !!(content.link && mime.getType(content.link)?.includes(type));
}