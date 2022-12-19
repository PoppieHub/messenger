import React from "react";
import {Dialogs as DialogList} from "../components/";
import {ChatsListResponse} from "../models/response/ChatsListResponse";
import {getOtherUserForNotMultiChat} from "../utils/Membership";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getUserName} from "../utils/User";
import {ChatsListItem} from "../models/response/ChatsListItem";

const Dialogs:React.FC = () => {
    const {store} = React.useContext(Context);
    const [chatsList, setChatsList] = React.useState<ChatsListResponse>({items: []});
    const [inputValue, setInputValue] = React.useState<string>('');
    const [sort, setSort] = React.useState(chatsList.items);
    const [flag, setFlag] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (store.getChats().items === undefined) {
            store.getChatsFromAPI().then();
        } else {
            setFlag(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setChatsList(store.getChats());
        chatsList.items && setSort(chatsList.items);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.chats, flag]);

    const onChangeInput = (value: string = '') => {
        if (chatsList.items.length > 0) {
            setSort(
                chatsList.items.filter(
                    (dialog: ChatsListItem) => (
                        (dialog.multiChat)? dialog.name.toLowerCase().indexOf(value.toLowerCase()) >= 0:
                            getUserName(
                                dialog.membership?
                                    getOtherUserForNotMultiChat(store, dialog.membership):
                                    store.getProfile()
                            ).toLowerCase().indexOf(value.toLowerCase()) >= 0
                    )
                )
            );
        }

        setInputValue(value);
    };

    return <DialogList
        chatsList={{items: sort}}
        onSearch={onChangeInput}
        inputValue={inputValue}
    />;

};

export default observer(Dialogs);