import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {getChats} from "../routes"
import {ChatsListResponse} from "../models/response/ChatsListResponse";

export default class ChatService {
    public static async getChatsList(): Promise<AxiosResponse<ChatsListResponse>> {
        return apiClient.get<ChatsListResponse>(getChats());
    }
}