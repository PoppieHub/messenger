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
}

const Message: React.FC<MessageProps> = (props) => {
    const {store} = React.useContext(Context);

    const checkRead = (read: ReadMessageListResponse): boolean => {
        return read.items && read.items.length > 0;
    }

    const isMe = (user: UserListItem, store: Store): boolean => {
        return store.getProfile().id === user.id;
    }

    return (
        <div className={classNames('message',
            {'message--isme':isMe(props.message.user, store)})}>
            <div className='message__content'>
                <div className={classNames({
                    'message__icon-read': isMe(props.message.user, store),
                    'message__icon--doubleTicks': isMe(props.message.user, store) && props.message.read && checkRead(props.message.read),
                    'message__icon--ticks': isMe(props.message.user, store) && props.message.read && !checkRead(props.message.read)
                }
                )} />
                <div className='message__avatar'>
                    {props.message.user.content && props.message.user.content.items[0].link &&
                        <img src={props.message.user.content.items[0].link} alt={props.message.user.nickname}/>
                    }
                </div>
                <div className='message__info'>
                    <div className='message__name'>
                        {(props.message.user.firstName)
                            ?<p className='message__name--normalName'>{props.message.user.firstName}</p>
                            :<p className='message__name--nickname'>{props.message.user.nickname}</p>
                        }
                    </div>
                    {
                        ((props.message.body_message &&
                            props.message.body_message.message &&
                            props.message.body_message.message.length !== 0) ||
                            (props.message.reply && props.message.reply.items && props.message.reply.items.length !== 0)) &&
                        <div className='message__bubble'>
                            {props.message.body_message && props.message.body_message?.message &&
                                <p className='message__text'>{props.message.body_message?.message}</p>
                            }
                        </div>
                    }
                    <div className='message__attachments'>
                        {
                            props.message.body_message &&
                            props.message.body_message.content &&
                            props.message.body_message.content.items &&
                            props.message.body_message.content.items.length > 0 &&
                            props.message.body_message.content.items.length !== 1 &&
                            props.message.body_message.content.items.map((item) =>
                                <div className='message__attachments-item' key={item.id}>
                                    {(item.link && mime.getType(item.link)?.includes('image')) &&
                                        <img src={item.link} alt={item.id?item.id:'attachments ' + item.link} />}
                                </div>
                            ) || (
                                props.message.body_message &&
                                props.message.body_message.content &&
                                props.message.body_message.content.items &&
                                props.message.body_message.content.items.length > 0 &&
                                props.message.body_message.content.items.length === 1 &&
                                props.message.body_message.content.items.map((item) =>
                                    <div className='message__attachments-item--onlyOneItem' key={item.id}>
                                        {(item.link && mime.getType(item.link)?.includes('image')) &&
                                            <img src={item.link} alt={item.id?item.id:'attachments ' + item.link} />}
                                    </div>
                                )
                            )
                        }
                    </div>
                    <span className='message__date'>
                        {props.message.updated_at &&
                            <p className='message__date--updateData'>
                                {`обновлено ` + formatDistanceToNow(props.message.updated_at, {addSuffix: true, locale: ruLocale})}
                            </p>
                        }
                        {!props.message.updated_at && props.message.created_at &&
                            <p className='message__date--createData'>
                                {`отправлено ` + formatDistanceToNow(props.message.created_at, {addSuffix: true, locale: ruLocale})}
                            </p>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Message;