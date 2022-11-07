import {UserListItem} from "../models/response/UserListItem";

export const getUserName = (user: UserListItem): string => {
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }

    return user.firstName || user.lastName || user.nickname;
}