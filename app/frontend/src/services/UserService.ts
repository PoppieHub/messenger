import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {profile, deleteUser, changeProfile, uploadAvatar} from "../routes"
import {UserListItem} from "../models/response/UserListItem";
import {DeleteUserResponse} from "../models/response/Other/DeleteUserResponse";
import ProfileRequest from "../models/request/ProfileRequest";
import {ContentListItem} from "../models/response/ContentListItem";

export default class UserService {
    public static async profile(): Promise<AxiosResponse<UserListItem>> {
        return apiClient.get<UserListItem>(profile());
    }

    public static async deleteProfile(): Promise<AxiosResponse<DeleteUserResponse>> {
        return apiClient.delete<DeleteUserResponse>(deleteUser());
    }

    public static async updateProfile(profileRequest: ProfileRequest): Promise<AxiosResponse<UserListItem>> {
        return apiClient.put<UserListItem>(changeProfile(), profileRequest);
    }

    public static async uploadAvatar(file: FormData): Promise<AxiosResponse<ContentListItem>> {
        return apiClient.post(uploadAvatar(), file);
    }
}