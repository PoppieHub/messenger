import React from 'react';
import classNames from "classnames";
import {checkRead, isMe} from "../../../utils/Message";
import {StatusProps} from "../../../models/props/StatusProps";

const Status: React.FC<StatusProps> = ({replyStatus = false, message, store, dialog = false}) => {

    if (!replyStatus) {
        return (
            <div className={classNames({
                    'message__icon-read': !dialog && isMe(message.user, store),
                    'message__icon--doubleTicks': !dialog && isMe(message.user, store) && message.read && checkRead(message.read),
                    'message__icon--ticks': !dialog && isMe(message.user, store) && message.read && !checkRead(message.read),
                    'dialog__messageIcon-read': dialog,
                    'dialog__messageIcon--doubleTicks': dialog && isMe(message.user, store) && message.read && checkRead(message.read),
                    'dialog__messageIcon--ticks':dialog && isMe(message.user, store) && message.read && !checkRead(message.read)
                }
            )}/>
        );
    } else {
        return (<></>);
    }
}

export default Status;