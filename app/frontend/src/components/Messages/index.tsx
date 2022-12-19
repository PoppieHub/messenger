import React from 'react';
import {Message} from "../index";
import {MessagesProps} from "../../models/props/MessagesProps";
import classNames from "classnames";
import "./Messages.scss";

const Messages: React.FC<MessagesProps> = (props) => {

    if (props.messages) {
        if (props.messages.items.length > 0) {
            return (
                <div ref={props.MessagesRef! && props.MessagesRef} className='messenger__dialog-messages-container'>
                    {props.messages.items.map((item) => (<Message message={item} key={item.id}/>))}
                </div>
            );
        } else {
            return (
                <div className="messages-items">
                    <span className="messages-items-title">В данном диалоге, пока нет сообщений</span>
                    <div className="messages-items--noData" />
                </div>
            );
        }
    } else {
        return (
            <div className={classNames('messages-items', {'messages-items--empty': true})}>
                <span className="messages-items-title">Откройте диалог, чтобы начать общение</span>
                <div className="messages-items--openDialog" />
            </div>
        );
    }
}

export default Messages;