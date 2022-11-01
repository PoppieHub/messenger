import {UserListItem} from './response/UserListItem';
import {ContentListResponse} from "./response/ContentListResponse";

export interface MessageProps {
    avatar: string;
    user: UserListItem;
    text: string;
    dateTimestamp: number;
    isMe?: boolean;
    isRead?: boolean;
    attachments?: ContentListResponse;
}