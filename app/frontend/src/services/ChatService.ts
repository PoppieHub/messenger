import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {getChatOrNew, getChats} from "../routes"
import {ChatsListResponse} from "../models/response/ChatsListResponse";
import {ChatsListItem} from "../models/response/ChatsListItem";

export default class ChatService {
    public static async getChatsList(): Promise<AxiosResponse<ChatsListResponse>> {
        return apiClient.get<ChatsListResponse>(getChats());
    }

    public static async getDialogOrNew(otherUserId: string): Promise<AxiosResponse<ChatsListItem>> {
        return apiClient.get<ChatsListItem>(getChatOrNew(otherUserId));
    }
}