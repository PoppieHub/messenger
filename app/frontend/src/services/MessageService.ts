import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {
    addMessage as addMessagePath,
    updateMessage as updateMessagePath,
    deleteMessages as deleteMessagesPath
} from "../routes";
import {ChatsListItem} from "../models/response/ChatsListItem";
import MessageRequest from "../models/request/MessageRequest";
import UpdateMessageItem from "../models/request/UpdateMessageItem";
import {MessagesShortListRequest} from "../models/request/MessagesShortListRequest";

export default class MessageService {
    public static async addMessage(message: MessageRequest): Promise<AxiosResponse<ChatsListItem>> {
        return apiClient.post<ChatsListItem>(addMessagePath(), message);
    }

    public static async updateMessage(message: UpdateMessageItem): Promise<AxiosResponse<ChatsListItem>> {
        return apiClient.put<ChatsListItem>(updateMessagePath(), message);
    }

    public static async deleteMessages(shortMessagesCollection: MessagesShortListRequest): Promise<AxiosResponse<MessagesShortListRequest>> {
        // @ts-ignore
        return apiClient.delete<MessagesShortListRequest>(deleteMessagesPath(), shortMessagesCollection);
    }
}