import React from "react";
import {ContentListResponse} from "../response/ContentListResponse";
import {ContentListItem} from "../response/ContentListItem";

export interface DialogInputProps {
    toggleEmojiPicker: () => void;
    emojiPickerVisible: boolean;
    setEmojiPickerVisible: (data: any) => void;
    value: boolean;
    textField: string;
    setTextField: (data: any) => void;
    maxSizeMessage: number;
    uploadDocumentHandler: (data: any) => void;
    handleSendMessage: () => void;
    pickerRef: React.Ref<HTMLDivElement> | null;
    textAreaRef: React.Ref<HTMLTextAreaElement> | null;
    addEmoji: (data: string) => void;
    flagForStyle: boolean;
    images: ContentListResponse;
    voice?: ContentListItem;
    callbackOnDeleteContent: (data: string) => void;
    onStopRecording: (data: any) => void;
    isRecording: boolean;
    isShortInput: boolean;
    onRecord: (data: any) => void;
}