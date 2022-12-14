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
import {observer} from "mobx-react-lite";
import './Dialog.scss';

const DialogItem: React.FC<DialogsItemProps> = ({chat}) => {
    const {store} = React.useContext(Context);
    const [otherUser, setOtherUser] = React.useState<UserListItem>();
    const [viewedDialog, setViewedDialog] = React.useState<boolean>(false);
    const [lastMessage, setLastMessage] = React.useState<MessagesListItem>(
        (chat.lastMessage || getHelloMessage(store))
    );

    React.useEffect(() => {
            if (!chat.multiChat && chat.membership && chat.membership.items.length > 0) {
                setOtherUser(getOtherUserForNotMultiChat(store, chat.membership));
            }
            if (chat.messages && chat.messages.items.length > 0) {
                setLastMessage(getLastMessage(chat.messages));
            } else {
                setLastMessage(getHelloMessage(store));
            }
            if (store.viewedDialogId === chat.id) {
                setViewedDialog(true);
            } else {
                setViewedDialog(false);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, store.chats, store.viewedDialogId]);

    return (
        <div
            className={classNames('dialogs__item', {
                'dialogs__item--online' : !chat.multiChat,
                'dialogs__item--active': viewedDialog
            })}
            onClick={() => {
                if (store.getViewedDialogId() === chat.id) {
                    store.setViewedDialogId(null);
                } else {
                    store.setCurrentDialog(chat);
                    store.setViewedDialogId(chat.id);
                }
            }}
        >
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
                   <p className='dialogs__item-chatName'>
                       <Name user={otherUser} chatName={chat.name} multiChat={chat.multiChat} />
                   </p>
                   {
                       (chat.messages && chat.messages.items.length > 0) && <MessageDate message={lastMessage} shortDate={true} />
                    }
                </div>
                {chat.multiChat && lastMessage &&
                    <div className='dialogs__item-info-medium'>
                        <p>{getUserNameLastMessage(lastMessage.user, store)}</p>
                    </div>
                }
                <div className="dialogs__item-info-bottom">
                    <p>{lastMessage?.bodyMessage?.message}</p>
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

export default observer(DialogItem);