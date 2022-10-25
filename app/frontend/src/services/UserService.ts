import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {profile} from "../routes"
import {UserListItem} from "../models/response/UserListItem";

export default class UserService {
    public static async profile(): Promise<AxiosResponse<UserListItem>> {
        return apiClient.get<UserListItem>(profile());
    }
}