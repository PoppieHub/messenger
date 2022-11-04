import {UserListItem} from "./UserListItem";

export interface MembershipListItem {
    id: string;
    notification: boolean;
    usersListItem: UserListItem;
}