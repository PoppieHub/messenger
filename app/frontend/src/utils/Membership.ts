import {UserListItem} from "../models/response/UserListItem";
import Store from "../store/store";
import {MembershipListResponse} from "../models/response/MembershipListResponse";

export const getOtherUserForNotMultiChat = (store: Store, membershipList: MembershipListResponse): UserListItem => {
    if (membershipList.items.length > 0) {
        for (let  i = 0; i < membershipList.items.length; i++) {
            if (membershipList.items[i].usersListItem.id !== store.getProfile().id) {
                return membershipList.items[i].usersListItem;
            }
        }
    }
    return store.getProfile();
}