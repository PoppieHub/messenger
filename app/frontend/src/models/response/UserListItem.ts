import {ContentListResponse} from "./ContentListResponse";

export interface UserListItem {
    id: string;
    email?: string | null;
    nickname: string;
    firstName?: string | null;
    lastName?: string | null;
    verified?: boolean | null;
    content?: ContentListResponse | null;
    hideEmail?: boolean | null;
}