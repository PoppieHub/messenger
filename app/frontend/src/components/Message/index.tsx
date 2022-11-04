import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru';
import classNames from "classnames";
import {MessagesListItem} from "../../models/response/MessagesListItem";
import {ReadMessageListResponse} from "../../models/response/ReadMessageListResponse";
import {Context} from "../../index";
import {UserListItem} from "../../models/response/UserListItem";
import Store from "../../store/store";
import mime from 'mime';
import './Message.scss';

interface MessageProps {
    message: MessagesListItem;
    replyStatus?: boolean;
}

const Message: React.FC<MessageProps> = ({message, replyStatus = false}) => {
    const {store} = React.useContext(Context);

    const checkRead = (read: ReadMessageListResponse): boolean => {
        return read.items && read.items.length > 0;
    }

    const isMe = (user: UserListItem, store: Store): boolean => {
        return store.getProfile().id === user.id;
    }

    return (
        <div className={classNames('message',
            {
                'message--isme': isMe(message.user, store) && !replyStatus,
                'message--reply': replyStatus
            })}>
            <div className={classNames('message__content',
                {'message__content--borderLine': replyStatus})}>
                {!replyStatus &&
                    <div className={classNames({
                            'message__icon-read': isMe(message.user, store),
                            'message__icon--doubleTicks': isMe(message.user, store) && message.read && checkRead(message.read),
                            'message__icon--ticks': isMe(message.user, store) && message.read && !checkRead(message.read)
                        }
                    )}/>
                }
                {!replyStatus &&
                    <div className='message__avatar'>
                        {message.user.content && message.user.content.items[0].link &&
                            <img src={message.user.content.items[0].link} alt={message.user.nickname}/>
                        }
                    </div>
                }
                <div className='message__info'>
                    <div className='message__name'>
                        {(message.user.firstName)
                            ?<p className='message__name--normalName'>{message.user.firstName}</p>
                            :<p className='message__name--nickname'>{message.user.nickname}</p>
                        }
                    </div>
                    {
                        ((message.body_message &&
                            message.body_message.message &&
                            message.body_message.message.length !== 0) ||
                            (message.reply && message.reply.items && message.reply.items.length !== 0)) &&
                        <div className='message__bubble'>
                            {message.body_message && message.body_message?.message &&
                                <p className='message__text'>{message.body_message?.message}</p>
                            }
                            {
                                message.reply && message.reply.items && message.reply.items.length > 0 &&
                                message.reply.items.map((item)=>
                                    <Message key={item.id} message={item} replyStatus={true} />
                                )
                            }
                        </div>
                    }
                    <div className='message__attachments'>
                        {
                            message.body_message &&
                            message.body_message.content &&
                            message.body_message.content.items &&
                            message.body_message.content.items.length > 0 &&
                            message.body_message.content.items.length !== 1 &&
                            message.body_message.content.items.map((item) =>
                                <div className='message__attachments-item' key={item.id}>
                                    {(item.link && mime.getType(item.link)?.includes('image')) &&
                                        <img src={item.link} alt={item.id?item.id:'attachments ' + item.link} />}
                                </div>
                            ) || (
                                message.body_message &&
                                message.body_message.content &&
                                message.body_message.content.items &&
                                message.body_message.content.items.length > 0 &&
                                message.body_message.content.items.length === 1 &&
                                message.body_message.content.items.map((item) =>
                                    <div className='message__attachments-item--onlyOneItem' key={item.id}>
                                        {(item.link && mime.getType(item.link)?.includes('image')) &&
                                            <img src={item.link} alt={item.id?item.id:'attachments ' + item.link} />}
                                    </div>
                                )
                            )
                        }
                    </div>
                    <span className='message__date'>
                        {message.updated_at &&
                            <p className='message__date--updateData'>
                                {`обновлено ` + formatDistanceToNow(message.updated_at, {addSuffix: true, locale: ruLocale})}
                            </p>
                        }
                        {!message.updated_at && message.created_at &&
                            <p className='message__date--createData'>
                                {`отправлено ` + formatDistanceToNow(message.created_at, {addSuffix: true, locale: ruLocale})}
                            </p>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Message;