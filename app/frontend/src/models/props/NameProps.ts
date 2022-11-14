import {UserListItem} from "../response/UserListItem";

export interface NameProps {
    multiChat?: boolean;
    chatName?: string;
    user?: UserListItem | null;
}