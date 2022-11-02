import {UserListItem} from "./UserListItem";
import {ReadMessageListResponse} from "./ReadMessageListResponse";
import {MessageItem} from "./MessageItem";
import {MessagesListResponse} from "./MessagesListResponse";

export interface MessagesListItem {
    id: string;
    user: UserListItem;
    ReadMessageListResponse?: ReadMessageListResponse | null;
    body_message?: MessageItem | null;
    reply?: MessagesListResponse | null;
    created_at: number;
    updated_at?: number | null;
}