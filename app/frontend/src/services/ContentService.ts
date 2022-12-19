import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {deleteContent} from "../routes"
import {ContentListItem} from "../models/response/ContentListItem";
import {DeleteContentResponse} from "../models/response/Other/DeleteContentResponse";

export default class ContentService {

    public static async deleteContent(data: ContentListItem): Promise<AxiosResponse<DeleteContentResponse>> {
        return apiClient.delete<DeleteContentResponse>(deleteContent(data.id || '0'));
    }
}