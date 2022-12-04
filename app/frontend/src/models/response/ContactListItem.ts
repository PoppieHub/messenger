import {UserListItem} from "./UserListItem";

export interface ContactListItem {
    id: string;
    status: boolean;
    toUser: UserListItem;
    fromUser: UserListItem;
}