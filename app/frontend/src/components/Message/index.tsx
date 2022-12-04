import React from 'react';
import classNames from "classnames";
import {MessageProps} from "../../models/props/MessageProps";
import {MessageDate, MessageStatus, AudioMessage, Avatar, Name} from "../index";
import {getUserName} from "../../utils/User";
import {Context} from "../../index";
import {isMe, checkMimeType} from "../../utils/Message";
import './Message.scss';

const Message: React.FC<MessageProps> = ({message, replyStatus = false}) => {
    const [isMyMessage, setIsMyMessage] = React.useState<boolean>(false);
    const {store} = React.useContext(Context);

    React.useEffect(() => {
        setIsMyMessage(isMe(message.user, store));
    }, [message, store]);

    return (
        <div className={classNames('message',
            {
                'message--isme': isMyMessage && !replyStatus,
                'message--reply': replyStatus
            })}>
            <div className={classNames('message__content',
                {'message__content--borderLine': replyStatus})}>
                <MessageStatus replyStatus={replyStatus} message={message} store={store} />
                {!replyStatus && <div className='message__avatar'>
                    <Avatar
                        contentList={message.user.content}
                        alt={getUserName(message.user)}
                        stringForFirstCharacter={getUserName(message.user)}
                        stringForGenerateColor={message.user.id}
                    />
                </div>}
                <div className='message__info'>
                    {replyStatus &&
                        <div className='message__reply'>
                            <span>Пересланное сообщение</span>
                        </div>
                    }
                    <Name user={message.user} />
                    {
                        ((message.bodyMessage &&
                            message.bodyMessage.message &&
                            message.bodyMessage.message.length !== 0) ||
                            (message.reply && message.reply.items && message.reply.items.length !== 0)) &&
                        <div className='message__bubble'>
                            {message.bodyMessage && message.bodyMessage?.message &&
                                <p className='message__text'>{message.bodyMessage?.message}</p>
                            }
                            {
                                message.reply && message.reply.items && message.reply.items.length > 0 &&
                                message.reply.items.map((item)=>
                                    <Message key={item.id} message={item} replyStatus={true} />
                                )
                            }
                        </div>
                    }
                        {
                            (message.bodyMessage && message.bodyMessage.content &&
                                message.bodyMessage.content.items && message.bodyMessage.content.items.length > 0) && (
                                    <div className='message__attachments'>
                                        {
                                            (message.bodyMessage.content.items.length !== 1 &&
                                            message.bodyMessage.content.items.map((item) =>
                                                (checkMimeType(item, 'audio') &&
                                                    <AudioMessage content={item} isMe={isMyMessage} replyStatus={replyStatus} key={item.id}/>) ||
                                                (checkMimeType(item, 'image') &&
                                                    <div className='message__attachments-item' key={item.id}>
                                                        <img src={item.link} alt={item.id ? item.id : 'attachments ' + item.link}/>
                                                    </div>)
                                            )) || (
                                            message.bodyMessage.content.items.length === 1 &&
                                            message.bodyMessage.content.items.map((item) =>
                                                (checkMimeType(item, 'audio') &&
                                                    <AudioMessage content={item} isMe={isMyMessage} replyStatus={replyStatus} key={item.id}/>) ||
                                                (checkMimeType(item, 'image') &&
                                                    <div className='message__attachments-item--onlyOneItem' key={item.id}>
                                                        <img src={item.link} alt={item.id ? item.id : 'attachments ' + item.link}/>
                                                    </div>)
                                            ))
                                        }
                                    </div>
                            )
                        }
                    <MessageDate message={message} />
                </div>
            </div>
        </div>
    );
}

export default Message;