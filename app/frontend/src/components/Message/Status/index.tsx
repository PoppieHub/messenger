import React from 'react';
import classNames from "classnames";
import {checkRead, isMe} from "../../../utils/Message";
import {StatusProps} from "../../../models/StatusProps";

const Status: React.FC<StatusProps> = ({replyStatus = false, message, store, enableRead = false}) => {
    return (
        !replyStatus &&
        <div className={classNames({
                'message__icon-read': isMe(message.user, store),
                'message__icon--doubleTicks': isMe(message.user, store) && message.read && checkRead(message.read),
                'message__icon--ticks': isMe(message.user, store) && message.read && !checkRead(message.read),
                'dialog__messageIcon-read': enableRead,
                'dialog__messageIcon--doubleTicks': enableRead && isMe(message.user, store) && message.read && checkRead(message.read),
                'dialog__messageIcon--ticks':enableRead && isMe(message.user, store) && message.read && !checkRead(message.read)
            }
        )}/> || <></>
    );
}

export default Status;