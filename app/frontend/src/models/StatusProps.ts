import {MessagesListItem} from "./response/MessagesListItem";
import Store from "../store/store";

export interface StatusProps {
    replyStatus?: boolean;
    message: MessagesListItem;
    store: Store;
    enableRead?: boolean;
}