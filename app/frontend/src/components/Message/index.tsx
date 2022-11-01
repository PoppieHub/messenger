import React from 'react';
import './Message.scss';
import {MessageProps} from "../../models/MessageProps";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru';
import classNames from "classnames";

const Message: React.FC<MessageProps> = ({avatar, user, text, dateTimestamp, isMe = false, isRead = false, attachments}) => {
    return (
        <div className={classNames('message', {'message--isme':isMe})}>
            <div className={'message__content'}>
                <div className={classNames("message__icon-read", {
                    'message__icon--doubleTicks': isRead,
                    'message__icon--ticks': !isRead}
                )} />
                <div className={'message__avatar'}>
                    <img src={avatar} alt={user.nickname}/>
                </div>
                <div className="message__info">
                    <div className={'message__bubble'}>
                        <p className={'message__text'}>{text}</p>
                    </div>
                    <div className="message__attachments">
                        {
                            attachments &&
                            attachments.items &&
                            attachments?.items?.length > 0 &&
                            attachments?.items?.map((item, index) =>
                                <div className="message__attachments-item" key={index}>
                                    <img src={item.link} alt={item.id?item.id:'attachments ' + item.link} />
                                </div>
                            )
                        }
                    </div>
                    <span className={'message__date'}>
                        {formatDistanceToNow(dateTimestamp, {addSuffix: true, locale: ruLocale})}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Message;