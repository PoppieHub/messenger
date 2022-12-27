import {ContactListItem} from "../response/ContactListItem";
import {UserListItem} from "../response/UserListItem";

export interface ContactItemProps {
    contact: ContactListItem;
    index: number;
    currentUser: UserListItem;
    addRequest?: boolean;
    sentRequest?: boolean;
    allAccepted?: boolean;
}