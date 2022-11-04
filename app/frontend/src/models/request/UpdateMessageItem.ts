import {ContentListResponse} from "../response/ContentListResponse";

export default interface UpdateMessageItem {
    id?: string | null;
    content?: ContentListResponse | null;
    message?: string | null;
}