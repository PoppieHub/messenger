import {ContentListResponse} from "./response/ContentListResponse";

export interface AvatarProps {
    contentList?: ContentListResponse | null;
    alt: string;
    stringForFirstCharacter: string;
    stringForGenerateColor: string;
}