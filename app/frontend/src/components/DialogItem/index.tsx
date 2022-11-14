import React from 'react';
import {DialogsItemProps} from "../../models/props/DialogsItemProps";
import {getLastMessage, getUserNameLastMessage} from "../../utils/Chat";
import {getHelloMessage} from "../../utils/Message";
import {getOtherUserForNotMultiChat} from "../../utils/Membership";
import {getUserName} from "../../utils/User";
import {MessageDate, MessageStatus, Avatar, Name} from "../";
import {MessagesListItem} from "../../models/response/MessagesListItem";
import {UserListItem} from "../../models/response/UserListItem";
import {Context} from "../../index";
import classNames from "classnames";
import './Dialog.scss';

const DialogItem: React.FC<DialogsItemProps> = ({chat}) => {
    const {store} = React.useContext(Context);
    const [otherUser, setOtherUser] = React.useState<UserListItem>();
    const [lastMessage, setLastMessage] = React.useState<MessagesListItem>(
        (chat.lastMessage || getHelloMessage(store))
    );

    React.useEffect(() => {
            if (!chat.multiChat && chat.membership) {
                setOtherUser(getOtherUserForNotMultiChat(store, chat.membership));
            }
            if (chat.messages && chat.messages.items.length > 0) {
                setLastMessage(getLastMessage(chat.messages));
            } else {
                setLastMessage(getHelloMessage(store));
            }
    }, [chat, store]);

    return (
        <div className={classNames('dialogs__item', {'dialogs__item--online' : !chat.multiChat})}>
            <div className="dialogs__item--avatar">
                {chat.multiChat &&
                    <Avatar
                        contentList={chat.content}
                        alt={chat.name}
                        stringForFirstCharacter={chat.name}
                        stringForGenerateColor={chat.name}
                    />
                }
                {!chat.multiChat && otherUser &&
                    <Avatar
                        contentList={otherUser.content}
                        alt={getUserName(otherUser)}
                        stringForFirstCharacter={getUserName(otherUser)}
                        stringForGenerateColor={otherUser.id}
                    />
                }
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                   <Name user={otherUser} chatName={chat.name} multiChat={chat.multiChat} />
                   {
                        chat.messages && chat.messages.items.length > 0 &&
                        lastMessage && <MessageDate message={lastMessage} shortDate={true} />
                    }
                </div>
                {chat.multiChat && lastMessage &&
                    <div className='dialogs__item-info-medium'>
                        <p>{getUserNameLastMessage(lastMessage.user, store)}</p>
                    </div>
                }
                <div className="dialogs__item-info-bottom">
                    <p>{lastMessage?.body_message?.message}</p>
                    {lastMessage && <MessageStatus message={lastMessage} store={store} dialog={true} />}
                    {chat.unreadMessageCounter !== 0 &&
                        <div className="dialogs__item-info-bottom-count">
                            {(chat.unreadMessageCounter && chat.unreadMessageCounter > 9)? '+9': chat.unreadMessageCounter}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default DialogItem;