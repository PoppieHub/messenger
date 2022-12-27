import {ContactListResponse} from "../response/ContactListResponse";
import {UserListItem} from "../response/UserListItem";

export interface ContactsBlockProps {
    currentUser: UserListItem;
    addRequestList: ContactListResponse;
    sentRequestList: ContactListResponse;
    allAcceptedList: ContactListResponse;
}