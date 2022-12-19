import {ContentListResponse} from "../response/ContentListResponse";
import {ChatsListItem} from "../response/ChatsListItem";

export interface AvatarProps {
    contentList?: ContentListResponse | null;
    alt: string;
    stringForFirstCharacter: string;
    stringForGenerateColor: string;
    shortAvatar?: boolean;
    selfProfile?: boolean;
    chat?: ChatsListItem;
}