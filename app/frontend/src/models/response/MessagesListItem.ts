import {UserListItem} from "./UserListItem";
import {ReadMessageListResponse} from "./ReadMessageListResponse";
import {MessageItem} from "./MessageItem";
import {MessagesListResponse} from "./MessagesListResponse";

export interface MessagesListItem {
    id: number;
    user: UserListItem;
    read?: ReadMessageListResponse | null;
    reply?: MessagesListResponse | null;
    bodyMessage?: MessageItem | null;
    createdAt?: number | null;
    updatedAt?: number | null;
}