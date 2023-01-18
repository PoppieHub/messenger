import {ContentListResponse} from "../response/ContentListResponse";

export interface UploadFilesProps {
    uploaded: ContentListResponse;
    callbackOnDeleteContent: (data: string) => void;
}