import {ContentListResponse} from "./ContentListResponse";
import {MessagesShortListResponse} from "./MessagesShortListResponse";

export interface MessageItem {
    content: ContentListResponse
    message?: string | null;
    replyMessage: MessagesShortListResponse;
}