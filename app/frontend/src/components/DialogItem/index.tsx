import React from 'react';
import {DialogsItemProps} from "../../models/DialogsItemProps";
import {getLastMessage } from "../../utils/Chat";
import {MessageDate, MessageStatus} from "../";
import {MessagesListItem} from "../../models/response/MessagesListItem";
import {Context} from "../../index";
import './Dialog.scss';

const DialogItem: React.FC<DialogsItemProps> = ({chat}) => {
    const {store} = React.useContext(Context);
    const [lastMessage, setLastMessage] = React.useState<MessagesListItem>();

    React.useEffect(() => {
            if (chat.messages && chat.messages.items.length > 0) {
                setLastMessage(getLastMessage(chat.messages));
            }
    }, [chat]);

    return (
        <div className='dialogs__item dialogs__item--online'>
            <div className="dialogs__item--avatar">
                {chat.content && chat.content.items[0].link &&
                    <img src={chat.content.items[0].link} alt={`${chat.name} avatar`}/>
                }
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <strong>{chat.name}</strong>
                    <span>13.06</span>
                   {/* {
                        chat.messages && chat.messages.items.length > 0 &&
                        lastMessage && <MessageDate message={lastMessage} shortDate={true} />
                    }*/}
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{lastMessage?.body_message?.message}</p>
                    {lastMessage && <MessageStatus message={lastMessage} store={store} enableRead={true} />}
                    {chat.unreadMessageCounter !== 0 && <div className="dialogs__item-info-bottom-count">
                        {(chat.unreadMessageCounter && chat.unreadMessageCounter > 9)? '+9': chat.unreadMessageCounter}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default DialogItem;