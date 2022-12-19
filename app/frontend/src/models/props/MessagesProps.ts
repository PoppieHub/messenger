import {MessagesListResponse} from "../response/MessagesListResponse";
import React from "react";

export interface MessagesProps {
    messages?: MessagesListResponse;
    MessagesRef?: React.Ref<HTMLDivElement> | null;
}