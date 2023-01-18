import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {deleteContent, uploadImage, uploadFile} from "../routes"
import {ContentListItem} from "../models/response/ContentListItem";
import {DeleteContentResponse} from "../models/response/Other/DeleteContentResponse";

export default class ContentService {

    public static async deleteContent(data: ContentListItem): Promise<AxiosResponse<DeleteContentResponse>> {
        return apiClient.delete<DeleteContentResponse>(deleteContent(data.id || '0'));
    }

    public static async uploadImage(file: FormData): Promise<AxiosResponse<ContentListItem>> {
        return apiClient.post(uploadImage(), file);
    }

    public static async uploadFile(file: FormData): Promise<AxiosResponse<ContentListItem>> {
        return apiClient.post(uploadFile(), file);
    }
}