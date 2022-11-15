import {ChatsListResponse} from "../response/ChatsListResponse";

export interface DialogsProps {
    chatsList: ChatsListResponse;
    onSearch?: (data: string) => void;
    inputValue?: string;
}