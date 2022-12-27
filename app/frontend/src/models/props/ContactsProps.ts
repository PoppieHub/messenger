import {ContactListResponse} from "../response/ContactListResponse";
import {UserListItem} from "../response/UserListItem";

export interface ContactsProps {
    contacts: ContactListResponse;
    currentUser: UserListItem;
    addRequest?: boolean;
    sentRequest?: boolean;
    allAccepted?: boolean;
}