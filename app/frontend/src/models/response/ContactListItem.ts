import {UserListItem} from "./UserListItem";

export interface ContactListItem {
    id: string;
    status: boolean;
    to_user: UserListItem;
    from_user: UserListItem;
}