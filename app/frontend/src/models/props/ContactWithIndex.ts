import {ContactListItem} from "../response/ContactListItem";

export interface ContactWithIndex {
    index?: number;
    contact: ContactListItem | null;
}