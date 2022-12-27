import {UserListItem} from "../models/response/UserListItem";
import {ContactListResponse} from "../models/response/ContactListResponse";
import {ContactWithIndex} from "../models/props/ContactWithIndex";

export const findContactOrReturnNull = (
    searchedUser: UserListItem,
    currentUser: UserListItem,
    collectionContacts: ContactListResponse
    ): ContactWithIndex => {
    let contact = {} as ContactWithIndex;

    collectionContacts.items.forEach((item, index) => {
        if (
            (item.fromUser.id === searchedUser.id && item.toUser.id === currentUser.id) ||
            (item.toUser.id === searchedUser.id && item.fromUser.id === currentUser.id)
        ) {
            contact = {
                index: index,
                contact: {...item}
            }
        }
    });

    if (contact && contact.contact) {
        return contact;
    }

    return {
        contact: null
    };
}
