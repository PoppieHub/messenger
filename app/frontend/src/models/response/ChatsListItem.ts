import {ContentListResponse} from "./ContentListResponse";
import {MembershipListResponse} from "./MembershipListResponse";
import {MessagesListResponse} from "./MessagesListResponse";
import {MessagesListItem} from "./MessagesListItem";

export interface ChatsListItem {
    id: number;
    name: string;
    description?: string | null;
    multiChat: boolean;
    content?: ContentListResponse;
    membership?: MembershipListResponse;
    messages?: MessagesListResponse;
    lastMessage?: MessagesListItem | null;
    unreadMessageCounter?: number | null;
}