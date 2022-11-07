import React from 'react';
import {DialogsItemProps} from "../../models/DialogsItemProps";
import {getLastMessage, getUserNameLastMessage} from "../../utils/Chat";
import {getHelloMessage} from "../../utils/Message";
import {getOtherUserForNotMultiChat} from "../../utils/Membership";
import {getUserName} from "../../utils/User";
import {MessageDate, MessageStatus} from "../";
import {MessagesListItem} from "../../models/response/MessagesListItem";
import {UserListItem} from "../../models/response/UserListItem";
import {Context} from "../../index";
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
    }, [chat]);

    return (
        <div className='dialogs__item dialogs__item--online'>
            <div className="dialogs__item--avatar">
                {chat.multiChat && chat.content && chat.content.items[0].link &&
                    <img src={chat.content.items[0].link} alt={`${chat.name} avatar`}/>
                }
                {!chat.multiChat && otherUser && otherUser.content && otherUser.content.items.length > 0 &&
                    <img src={otherUser.content.items[0].link} alt={`${otherUser.nickname} avatar`}/>
                }
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    {chat.multiChat && <strong>{chat.name}</strong>}
                    {!chat.multiChat && otherUser &&
                        <strong>
                            {getUserName(otherUser)}
                        </strong>
                    }
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