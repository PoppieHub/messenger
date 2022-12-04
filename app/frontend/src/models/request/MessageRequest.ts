import {MessageItem} from "../response/MessageItem";

export default interface MessageRequest {
    chat?: string | null;
    bodyMessage?: MessageItem | null;
}