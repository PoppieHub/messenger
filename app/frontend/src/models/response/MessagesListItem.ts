import {UserListItem} from "./UserListItem";
import {ReadMessageListResponse} from "./ReadMessageListResponse";
import {MessageItem} from "./MessageItem";
import {MessagesListResponse} from "./MessagesListResponse";

export interface MessagesListItem {
    id: string;
    user: UserListItem;
    read?: ReadMessageListResponse | null;
    reply?: MessagesListResponse | null;
    body_message?: MessageItem | null;
    created_at: number;
    updated_at?: number | null;
}