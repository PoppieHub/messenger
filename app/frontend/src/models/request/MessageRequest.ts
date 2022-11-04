import {MessageItem} from "../response/MessageItem";

export default interface MessageRequest {
    chat?: string | null;
    body_message?: MessageItem | null;
}