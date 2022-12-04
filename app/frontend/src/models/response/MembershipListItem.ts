import {UserListItem} from "./UserListItem";

export interface MembershipListItem {
    id: number;
    notification: boolean;
    usersListItem: UserListItem;
}