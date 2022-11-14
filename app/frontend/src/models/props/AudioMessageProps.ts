import {ContentListItem} from "../response/ContentListItem";

export interface AudioMessageProps {
    content: ContentListItem;
    isMe?: boolean;
    replyStatus?: boolean;
}