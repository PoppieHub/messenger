import React from 'react';
import {DropDownMenu, Name, UserStatus} from "../";
import {DialogInput} from "../../containers";
import {Context} from "../../index";
import {Messages} from "../../containers";
import {observer} from "mobx-react-lite";
import {UserListItem} from "../../models/response/UserListItem";
import {getOtherUserForNotMultiChat} from "../../utils/Membership";
import {ChatsListItem} from "../../models/response/ChatsListItem";
import './Dialog.scss';

const Dialog = () => {
    const {store} = React.useContext(Context);
    const [chat, setChat] = React.useState<ChatsListItem>();
    const [otherUser, setOtherUser] = React.useState<UserListItem>();

    React.useEffect(() => {

        if (store.currentDialog! &&
            !store.currentDialog.multiChat &&
            store.currentDialog.membership &&
            store.currentDialog.membership.items.length > 0
        ) {
            setOtherUser(
                getOtherUserForNotMultiChat(store, store.currentDialog.membership)
            );
        }

        if (store.currentDialog.id) {
            setChat({
                ...chat,
                ...store.currentDialog
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.currentDialog]);

    if (store.getViewedDialogId()!) {
        return (
            <div className="messenger__dialog">
                <div className="messenger__dialog-header">
                    <div/>
                    <div className="messenger__dialog-header-info">
                        <p className="messenger__dialog-header-name">
                            <Name user={otherUser} chatName={store.currentDialog.name} multiChat={store.currentDialog.multiChat} />
                        </p>
                        {(!store.getCurrentDialog().multiChat &&
                                <div className="messenger__dialog-header-status">
                                    <UserStatus status={true} />
                                </div>
                            ) ||
                            <div className="messenger__dialog-header-countMemberships">
                                {store.currentDialog.membership?.items &&
                                    <span>
                                    {`Участников в диалоге: ${Object.keys(store.currentDialog.membership?.items).length}`}
                                </span>
                                }
                            </div>
                        }
                    </div>
                    <DropDownMenu children={<></>} />
                </div>
                <div className="messenger__dialog-messages">
                    <Messages />
                </div>
                {chat &&
                    <div className="messenger__dialog-input">
                        <DialogInput chat={chat} />
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div className="messenger__dialog">
                <div className="messenger__dialog-messages">
                    <Messages />
                </div>
            </div>
        );
    }
}

export default observer(Dialog);