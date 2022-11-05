import {MessagesListItem} from "./response/MessagesListItem";

export interface MessageProps {
    message: MessagesListItem;
    replyStatus?: boolean;
}